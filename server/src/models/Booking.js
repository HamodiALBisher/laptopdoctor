const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  requestId: {
    type: String,
    unique: true,
    required: true
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  deviceType: {
    type: String,
    required: true,
    enum: ['Laptop', 'Desktop', 'Gaming PC', 'External HDD', 'SSD', 'Other']
  },
  brandModel: {
    type: String,
    trim: true
  },
  problemCategory: {
    type: String,
    required: true,
    trim: true
  },
  problemDescription: {
    type: String,
    required: true,
    trim: true,
    maxlength: 2000
  },
  urgency: {
    type: String,
    required: true,
    enum: ['Normal', 'Urgent', 'Emergency'],
    default: 'Normal'
  },
  preferredContact: {
    type: String,
    required: true,
    enum: ['Phone', 'WhatsApp', 'Email'],
    default: 'Phone'
  },
  imageUrl: {
    type: String
  },
  status: {
    type: String,
    enum: ['Pending', 'Diagnosing', 'Waiting for Approval', 'In Repair', 'Ready for Pickup', 'Completed'],
    default: 'Pending'
  },
  estimatedPrice: {
    type: String,
    default: ''
  },
  technicianNotes: {
    type: String,
    default: ''
  },
  isUrgent: {
    type: Boolean,
    default: false
  },
  privacyAgreed: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  timestamps: true
});

// Index for search
bookingSchema.index({ fullName: 'text', phone: 'text', requestId: 'text' });
bookingSchema.index({ status: 1 });
bookingSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Booking', bookingSchema);
