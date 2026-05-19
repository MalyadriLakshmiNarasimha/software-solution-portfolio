# KLD TECHNOLOGIES Portfolio — MERN Stack

Production-grade enterprise software portfolio with full CMS.

## Structure

```
/                     # Client (React + Vite)
├── src/
│   ├── components/   # Reusable UI
│   ├── pages/        # Route pages + admin panel
│   ├── hooks/        # Custom hooks
│   ├── context/      # Auth context
│   ├── services/     # Axios API layer
│   └── utils/        # Helpers
└── server/           # Node + Express backend
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middleware/
    └── utils/
```

## How to Run

### Prerequisites
- Node.js 20+
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account (optional, for image uploads)
- Gmail account with App Password (optional, for contact emails)

### Quick Start (Windows PowerShell / macOS / Linux)

#### 1. Install dependencies

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd server
npm install --legacy-peer-deps
```

#### 2. Set up environment variables

Create `server/.env`:
```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?appName=Cluster0
CLIENT_URL=http://localhost:5173
PORT=5000
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_refresh_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
ADMIN_EMAIL=admin@example.com
NODE_ENV=development
```

#### 3. Run both servers concurrently

**Terminal 1 — Backend (port 5000):**
```bash
cd server
npm run dev
```

**Terminal 2 — Frontend (port 5173):**
```bash
npm run dev
```

#### 4. Access the app

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api
- **Admin panel:** http://localhost:5173/admin

#### 5. (Optional) Seed database with sample data

```bash
cd server
npm run seed
```

Creates:
- Admin user: `admin@example.com` / `Admin@123`
- 6 sample projects
- 4 blog posts
- 5 team members

## URLs
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api
- Admin panel: http://localhost:5173/admin

## Key Features
- 8 public pages with Framer Motion animations
- Full admin CMS (projects, blog, team, inquiries, settings)
- JWT auth (access token in memory + refresh token httpOnly cookie)
- Cloudinary image uploads
- Nodemailer contact form
- Dark/light mode
- React Query data caching
- Per-page SEO with React Helmet Async
- Rate limiting, Helmet.js security headers, CORS

# software-solution-portfolio
