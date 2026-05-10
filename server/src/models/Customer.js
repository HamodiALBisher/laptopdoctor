const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const customerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  passwordHash: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

customerSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.passwordHash);
};

customerSchema.statics.hashPassword = async function(password) {
  return bcrypt.hash(password, 12);
};

module.exports = mongoose.model('Customer', customerSchema);
