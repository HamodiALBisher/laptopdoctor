const nodemailer = require('nodemailer');

const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  tls: { rejectUnauthorized: false },
  connectionTimeout: 15000,
  greetingTimeout: 15000,
  socketTimeout: 20000
});

const fromAddress = process.env.SMTP_FROM || process.env.SMTP_USER;

async function sendMail(to, subject, html) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('Email skipped (SMTP not configured):', subject);
    return;
  }
  try {
    await transporter.sendMail({ from: fromAddress, to, subject, html });
    console.log('Email sent:', subject, '->', to);
  } catch (err) {
    console.error('Email error:', err.message);
  }
}

function welcomeEmail(customer) {
  const subject = 'Welcome to LaptopDoctor!';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0e1a; color: #ffffff; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #111827, #1a2332); padding: 40px 30px; text-align: center; border-bottom: 2px solid #d4a843;">
        <h1 style="margin: 0; color: #d4a843; font-size: 28px;">LaptopDoctor</h1>
        <p style="margin: 8px 0 0; color: #9ca3af; font-size: 14px;">Professional PC & Laptop Repair</p>
      </div>
      <div style="padding: 30px;">
        <h2 style="color: #ffffff; margin: 0 0 16px;">Welcome, ${customer.fullName}!</h2>
        <p style="color: #d1d5db; line-height: 1.6;">Thank you for creating your account with LaptopDoctor. We're glad to have you on board!</p>
        <p style="color: #d1d5db; line-height: 1.6;">With your account, you can:</p>
        <ul style="color: #d1d5db; line-height: 2;">
          <li>Book repairs quickly with auto-filled details</li>
          <li>Track all your repair requests in one place</li>
          <li>Get real-time status updates on your repairs</li>
          <li>View repair history and technician notes</li>
        </ul>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}/booking" style="display: inline-block; background: #d4a843; color: #0a0e1a; text-decoration: none; padding: 14px 32px; border-radius: 10px; font-weight: bold; font-size: 16px;">Book a Repair</a>
        </div>
        <p style="color: #6b7280; font-size: 13px; text-align: center;">If you have any questions, feel free to contact us anytime.</p>
      </div>
      <div style="background: #111827; padding: 20px 30px; text-align: center; border-top: 1px solid #1f2937;">
        <p style="color: #6b7280; font-size: 12px; margin: 0;">&copy; ${new Date().getFullYear()} LaptopDoctor. All rights reserved.</p>
      </div>
    </div>
  `;
  return sendMail(customer.email, subject, html);
}

function bookingConfirmationEmail(booking) {
  const subject = `Booking Confirmed - ${booking.requestId}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0e1a; color: #ffffff; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #111827, #1a2332); padding: 40px 30px; text-align: center; border-bottom: 2px solid #d4a843;">
        <h1 style="margin: 0; color: #d4a843; font-size: 28px;">LaptopDoctor</h1>
        <p style="margin: 8px 0 0; color: #9ca3af; font-size: 14px;">Repair Booking Confirmation</p>
      </div>
      <div style="padding: 30px;">
        <h2 style="color: #ffffff; margin: 0 0 16px;">Thank you, ${booking.fullName}!</h2>
        <p style="color: #d1d5db; line-height: 1.6;">Your repair request has been received. Our team will review it and contact you shortly.</p>
        
        <div style="background: #111827; border-radius: 10px; padding: 20px; margin: 24px 0; border: 1px solid #1f2937;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0 0 6px; text-transform: uppercase;">Your Request ID</p>
          <p style="color: #d4a843; font-size: 28px; font-weight: bold; margin: 0; font-family: monospace;">${booking.requestId}</p>
          <p style="color: #6b7280; font-size: 12px; margin: 8px 0 0;">Save this ID to track your repair status</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 10px 0; color: #9ca3af; font-size: 14px; border-bottom: 1px solid #1f2937;">Device</td>
            <td style="padding: 10px 0; color: #ffffff; font-size: 14px; text-align: right; border-bottom: 1px solid #1f2937;">${booking.deviceType}${booking.brandModel ? ' — ' + booking.brandModel : ''}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #9ca3af; font-size: 14px; border-bottom: 1px solid #1f2937;">Category</td>
            <td style="padding: 10px 0; color: #ffffff; font-size: 14px; text-align: right; border-bottom: 1px solid #1f2937;">${booking.problemCategory}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #9ca3af; font-size: 14px; border-bottom: 1px solid #1f2937;">Urgency</td>
            <td style="padding: 10px 0; color: ${booking.urgency === 'Emergency' ? '#ef4444' : booking.urgency === 'Urgent' ? '#eab308' : '#ffffff'}; font-size: 14px; text-align: right; border-bottom: 1px solid #1f2937; font-weight: bold;">${booking.urgency}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #9ca3af; font-size: 14px;">Status</td>
            <td style="padding: 10px 0; color: #22d3ee; font-size: 14px; text-align: right; font-weight: bold;">Pending</td>
          </tr>
        </table>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}/track" style="display: inline-block; background: #d4a843; color: #0a0e1a; text-decoration: none; padding: 14px 32px; border-radius: 10px; font-weight: bold; font-size: 16px;">Track Your Repair</a>
        </div>

        <p style="color: #6b7280; font-size: 13px; text-align: center;">We'll contact you via ${booking.preferredContact} to confirm the details.</p>
      </div>
      <div style="background: #111827; padding: 20px 30px; text-align: center; border-top: 1px solid #1f2937;">
        <p style="color: #6b7280; font-size: 12px; margin: 0;">&copy; ${new Date().getFullYear()} LaptopDoctor. All rights reserved.</p>
      </div>
    </div>
  `;
  return sendMail(booking.email, subject, html);
}

function statusUpdateEmail(booking) {
  const statusMessages = {
    'Pending': 'Your repair request is in our queue and will be reviewed shortly.',
    'Diagnosing': 'Our technician is now diagnosing your device to identify the issue.',
    'Waiting for Approval': 'Diagnosis is complete! We need your approval to proceed with the repair. We\'ll contact you with the details and cost estimate.',
    'In Repair': 'Great news! Your device is now being repaired by our technician.',
    'Ready for Pickup': 'Your device is ready! You can pick it up at our location during working hours.',
    'Completed': 'Your repair is complete. Thank you for choosing LaptopDoctor!'
  };

  const statusColors = {
    'Pending': '#eab308',
    'Diagnosing': '#3b82f6',
    'Waiting for Approval': '#f97316',
    'In Repair': '#22d3ee',
    'Ready for Pickup': '#22c55e',
    'Completed': '#10b981'
  };

  const subject = `Repair Update: ${booking.status} - ${booking.requestId}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0e1a; color: #ffffff; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #111827, #1a2332); padding: 40px 30px; text-align: center; border-bottom: 2px solid #d4a843;">
        <h1 style="margin: 0; color: #d4a843; font-size: 28px;">LaptopDoctor</h1>
        <p style="margin: 8px 0 0; color: #9ca3af; font-size: 14px;">Repair Status Update</p>
      </div>
      <div style="padding: 30px;">
        <h2 style="color: #ffffff; margin: 0 0 16px;">Hi ${booking.fullName},</h2>
        
        <div style="background: #111827; border-radius: 10px; padding: 20px; margin: 20px 0; border: 1px solid #1f2937; text-align: center;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0 0 10px; text-transform: uppercase;">Request ${booking.requestId}</p>
          <div style="display: inline-block; background: ${statusColors[booking.status] || '#6b7280'}20; border: 1px solid ${statusColors[booking.status] || '#6b7280'}40; border-radius: 8px; padding: 10px 24px;">
            <p style="color: ${statusColors[booking.status] || '#6b7280'}; font-size: 20px; font-weight: bold; margin: 0;">${booking.status}</p>
          </div>
        </div>

        <p style="color: #d1d5db; line-height: 1.6; font-size: 15px;">${statusMessages[booking.status] || 'Your repair status has been updated.'}</p>

        ${booking.estimatedPrice ? `
          <div style="background: #111827; border-radius: 8px; padding: 14px 20px; margin: 16px 0; border: 1px solid #1f2937;">
            <span style="color: #9ca3af; font-size: 13px;">Estimated Price: </span>
            <span style="color: #d4a843; font-weight: bold; font-size: 16px;">${booking.estimatedPrice}</span>
          </div>
        ` : ''}

        ${booking.technicianNotes ? `
          <div style="background: #111827; border-radius: 8px; padding: 14px 20px; margin: 16px 0; border: 1px solid #1f2937;">
            <p style="color: #9ca3af; font-size: 13px; margin: 0 0 6px;">Technician Notes:</p>
            <p style="color: #d1d5db; font-size: 14px; margin: 0; line-height: 1.5;">${booking.technicianNotes}</p>
          </div>
        ` : ''}

        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}/track" style="display: inline-block; background: #d4a843; color: #0a0e1a; text-decoration: none; padding: 14px 32px; border-radius: 10px; font-weight: bold; font-size: 16px;">View Full Details</a>
        </div>
      </div>
      <div style="background: #111827; padding: 20px 30px; text-align: center; border-top: 1px solid #1f2937;">
        <p style="color: #6b7280; font-size: 12px; margin: 0;">&copy; ${new Date().getFullYear()} LaptopDoctor. All rights reserved.</p>
      </div>
    </div>
  `;
  return sendMail(booking.email, subject, html);
}

module.exports = { sendMail, welcomeEmail, bookingConfirmationEmail, statusUpdateEmail };
