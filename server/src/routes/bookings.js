const express = require('express');
const { body, validationResult, query } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const path = require('path');
const Booking = require('../models/Booking');
const authMiddleware = require('../middleware/auth');
const { bookingConfirmationEmail, statusUpdateEmail } = require('../utils/mailer');

const router = express.Router();

// Multer config for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../../uploads')),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) return cb(null, true);
    cb(new Error('Only image files (jpg, png, webp) are allowed'));
  }
});

// POST /api/bookings - Create booking
router.post('/', upload.single('image'), [
  body('fullName').trim().notEmpty().withMessage('Full name is required'),
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('city').trim().notEmpty().withMessage('City is required'),
  body('deviceType').isIn(['Laptop', 'Desktop', 'Gaming PC', 'External HDD', 'SSD', 'Other']).withMessage('Invalid device type'),
  body('problemCategory').trim().notEmpty().withMessage('Problem category is required'),
  body('problemDescription').trim().notEmpty().withMessage('Problem description is required'),
  body('urgency').isIn(['Normal', 'Urgent', 'Emergency']).withMessage('Invalid urgency'),
  body('preferredContact').isIn(['Phone', 'WhatsApp', 'Email']).withMessage('Invalid contact method'),
  body('privacyAgreed').equals('true').withMessage('You must agree to privacy policy')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const requestId = `LD-${Date.now().toString(36).toUpperCase()}-${uuidv4().slice(0, 4).toUpperCase()}`;

    const bookingData = {
      requestId,
      fullName: req.body.fullName,
      phone: req.body.phone,
      email: req.body.email,
      city: req.body.city,
      deviceType: req.body.deviceType,
      brandModel: req.body.brandModel || '',
      problemCategory: req.body.problemCategory,
      problemDescription: req.body.problemDescription,
      urgency: req.body.urgency,
      preferredContact: req.body.preferredContact,
      privacyAgreed: req.body.privacyAgreed === 'true',
      isUrgent: req.body.urgency === 'Emergency'
    };

    if (req.file) {
      bookingData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const booking = new Booking(bookingData);
    await booking.save();

    bookingConfirmationEmail(booking);

    res.status(201).json({
      message: 'Booking created successfully',
      requestId: booking.requestId,
      booking: {
        id: booking._id,
        requestId: booking.requestId,
        status: booking.status,
        createdAt: booking.createdAt
      }
    });
  } catch (err) {
    console.error('Booking creation error:', err.message);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// GET /api/bookings - Get all bookings (admin)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { status, search, page = 1, limit = 20 } = req.query;
    const filter = {};

    if (status && status !== 'all') {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { requestId: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { deviceType: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [bookings, total] = await Promise.all([
      Booking.find(filter).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
      Booking.countDocuments(filter)
    ]);

    // Stats
    const [totalAll, pending, diagnosing, inRepair, completed, urgent] = await Promise.all([
      Booking.countDocuments(),
      Booking.countDocuments({ status: 'Pending' }),
      Booking.countDocuments({ status: 'Diagnosing' }),
      Booking.countDocuments({ status: 'In Repair' }),
      Booking.countDocuments({ status: 'Completed' }),
      Booking.countDocuments({ isUrgent: true })
    ]);

    res.json({
      bookings,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
      },
      stats: {
        total: totalAll,
        pending,
        diagnosing,
        inRepair,
        completed,
        urgent
      }
    });
  } catch (err) {
    console.error('Fetch bookings error:', err.message);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// GET /api/bookings/track - Track booking by phone or requestId (public)
router.get('/track', async (req, res) => {
  try {
    const { phone, requestId } = req.query;
    if (!phone && !requestId) {
      return res.status(400).json({ error: 'Phone number or request ID is required' });
    }

    const filter = {};
    if (requestId) filter.requestId = requestId;
    else if (phone) filter.phone = phone;

    const bookings = await Booking.find(filter)
      .select('requestId status deviceType brandModel problemCategory createdAt updatedAt')
      .sort({ createdAt: -1 });

    if (!bookings.length) {
      return res.status(404).json({ error: 'No bookings found' });
    }

    res.json({ bookings });
  } catch (err) {
    console.error('Track booking error:', err.message);
    res.status(500).json({ error: 'Failed to track booking' });
  }
});

// GET /api/bookings/export/csv - Export bookings as CSV (admin)
router.get('/export/csv', authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    const headers = ['Request ID', 'Full Name', 'Phone', 'Email', 'City', 'Device', 'Brand/Model', 'Problem', 'Description', 'Urgency', 'Status', 'Price', 'Notes', 'Created'];
    const rows = bookings.map(b => [
      b.requestId, b.fullName, b.phone, b.email, b.city, b.deviceType,
      b.brandModel, b.problemCategory, `"${b.problemDescription}"`,
      b.urgency, b.status, b.estimatedPrice, `"${b.technicianNotes}"`,
      b.createdAt.toISOString()
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=bookings.csv');
    res.send(csv);
  } catch (err) {
    console.error('Export error:', err.message);
    res.status(500).json({ error: 'Failed to export' });
  }
});

// GET /api/bookings/:id - Get single booking (admin)
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json(booking);
  } catch (err) {
    console.error('Fetch booking error:', err.message);
    res.status(500).json({ error: 'Failed to fetch booking' });
  }
});

// PATCH /api/bookings/:id/status - Update status (admin)
router.patch('/:id/status', authMiddleware, [
  body('status').isIn(['Pending', 'Diagnosing', 'Waiting for Approval', 'In Repair', 'Ready for Pickup', 'Completed'])
    .withMessage('Invalid status')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    statusUpdateEmail(booking);

    res.json({ message: 'Status updated', booking });
  } catch (err) {
    console.error('Update status error:', err.message);
    res.status(500).json({ error: 'Failed to update status' });
  }
});

// PATCH /api/bookings/:id - Update booking (admin)
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const allowedUpdates = ['status', 'estimatedPrice', 'technicianNotes', 'isUrgent'];
    const updates = {};
    for (const key of allowedUpdates) {
      if (req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }
    }

    const oldBooking = await Booking.findById(req.params.id);
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    if (updates.status && oldBooking && oldBooking.status !== updates.status) {
      statusUpdateEmail(booking);
    }

    res.json({ message: 'Booking updated', booking });
  } catch (err) {
    console.error('Update booking error:', err.message);
    res.status(500).json({ error: 'Failed to update booking' });
  }
});

// DELETE /api/bookings/:id - Delete booking (admin)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json({ message: 'Booking deleted' });
  } catch (err) {
    console.error('Delete booking error:', err.message);
    res.status(500).json({ error: 'Failed to delete booking' });
  }
});

module.exports = router;
