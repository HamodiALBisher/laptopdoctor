const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const Customer = require('../models/Customer');
const Booking = require('../models/Booking');
const { welcomeEmail } = require('../utils/mailer');

const router = express.Router();

// Middleware to verify customer token
const customerAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'customer') {
      return res.status(403).json({ error: 'Access denied.' });
    }
    req.customer = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

// POST /api/customers/register
router.post('/register', [
  body('fullName').trim().notEmpty().withMessage('Full name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, phone, password } = req.body;

    const existing = await Customer.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'An account with this email already exists' });
    }

    const passwordHash = await Customer.hashPassword(password);
    const customer = new Customer({ fullName, email, phone, passwordHash });
    await customer.save();

    welcomeEmail(customer);

    const token = jwt.sign(
      { id: customer._id, email: customer.email, role: 'customer' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      customer: {
        id: customer._id,
        fullName: customer.fullName,
        email: customer.email,
        phone: customer.phone
      }
    });
  } catch (err) {
    console.error('Registration error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/customers/login
router.post('/login', [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await customer.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: customer._id, email: customer.email, role: 'customer' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      customer: {
        id: customer._id,
        fullName: customer.fullName,
        email: customer.email,
        phone: customer.phone
      }
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/customers/me - Get current customer profile
router.get('/me', customerAuth, async (req, res) => {
  try {
    const customer = await Customer.findById(req.customer.id).select('-passwordHash');
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/customers/my-repairs - Get customer's bookings
router.get('/my-repairs', customerAuth, async (req, res) => {
  try {
    const customer = await Customer.findById(req.customer.id);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    const bookings = await Booking.find({ email: customer.email })
      .sort({ createdAt: -1 });

    res.json({ bookings });
  } catch (err) {
    console.error('My repairs error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
