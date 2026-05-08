require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const email = process.env.ADMIN_EMAIL || 'admin@laptopdoctor.com';
    const password = process.env.ADMIN_PASSWORD || 'admin123';

    const existing = await Admin.findOne({ email });
    if (existing) {
      console.log('Admin already exists:', email);
    } else {
      const passwordHash = await Admin.hashPassword(password);
      await Admin.create({ email, passwordHash, role: 'admin' });
      console.log('Admin created:', email);
    }

    await mongoose.disconnect();
    console.log('Seed complete');
  } catch (err) {
    console.error('Seed error:', err.message);
    process.exit(1);
  }
}

seed();
