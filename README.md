# LaptopDoctor - Professional PC & Laptop Repair Website

A full-stack website for a professional PC technician business featuring repair booking, status tracking, admin dashboard, multi-language support (EN/HE/AR), and accessibility features.

## Tech Stack

- **Frontend:** React + Vite, Tailwind CSS, Framer Motion, React Router, i18next
- **Backend:** Node.js + Express, Mongoose
- **Database:** MongoDB Atlas
- **Auth:** JWT for admin routes
- **Security:** Helmet, CORS, Rate Limiting, bcrypt, Input Validation

## Project Structure

```
laptopdoctor/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # Auth & Accessibility contexts
│   │   ├── i18n/           # Translations (en, he, ar)
│   │   ├── pages/          # Page components
│   │   └── App.jsx         # Main app with routing
│   └── index.html
├── server/                 # Express backend
│   ├── src/
│   │   ├── models/         # Mongoose models (Booking, Admin)
│   │   ├── routes/         # API routes (bookings, auth)
│   │   ├── middleware/     # JWT auth middleware
│   │   └── index.js        # Server entry point
│   └── uploads/            # Uploaded images
└── README.md
```

## Setup

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

### 1. Clone the repository
```bash
git clone <repo-url>
cd laptopdoctor
```

### 2. Set up the server
```bash
cd server
cp .env.example .env
# Edit .env with your MongoDB URI and secrets
npm install
npm run seed    # Create default admin user
npm run dev     # Start server on port 4000
```

### 3. Set up the client
```bash
cd client
npm install
npm run dev     # Start client on port 5173
```

### 4. Access the site
- Frontend: http://localhost:5173
- Backend API: http://localhost:4000
- Health check: http://localhost:4000/api/health

### Default Admin Credentials
- Email: admin@laptopdoctor.com
- Password: Admin@123

## Environment Variables

See `server/.env.example` for all required environment variables:

| Variable | Description |
|----------|-------------|
| MONGODB_URI | MongoDB Atlas connection string |
| PORT | Server port (default: 4000) |
| JWT_SECRET | Secret key for JWT tokens |
| ADMIN_EMAIL | Default admin email for seeding |
| ADMIN_PASSWORD | Default admin password for seeding |

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/health | No | Health check |
| POST | /api/bookings | No | Create booking |
| GET | /api/bookings | Admin | List all bookings |
| GET | /api/bookings/track | No | Track booking status |
| GET | /api/bookings/:id | Admin | Get single booking |
| PATCH | /api/bookings/:id/status | Admin | Update status |
| PATCH | /api/bookings/:id | Admin | Update booking |
| DELETE | /api/bookings/:id | Admin | Delete booking |
| GET | /api/bookings/export/csv | Admin | Export to CSV |
| POST | /api/auth/login | No | Admin login |

## Features

### Pages
- Home page with hero, trust badges, services preview, reviews, FAQ preview
- Services page with 17 service cards
- Booking form with image upload
- Repair status tracking
- Admin dashboard with statistics, search, filter, export
- Contact page with map, form, emergency CTA
- About page
- FAQ page with accordion
- Blog/Tips section
- Accessibility statement page
- 404 page

### Accessibility
- WCAG 2.1 Level AA compliance
- Keyboard navigation
- Skip-to-content link
- High contrast mode
- Adjustable font sizes
- Reduce motion option
- ARIA attributes
- Focus indicators
- Screen reader friendly
- Floating accessibility widget

### Internationalization
- English (LTR)
- Hebrew (RTL)
- Arabic (RTL)
- Language switcher in navbar

### Security
- Helmet for HTTP headers
- CORS configuration
- Rate limiting
- Input validation & sanitization
- bcrypt password hashing
- JWT authentication
- Environment variables for secrets
