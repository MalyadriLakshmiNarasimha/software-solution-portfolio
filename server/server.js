import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';

import authRoutes from './routes/auth.js';
import projectRoutes from './routes/projects.js';
import blogRoutes from './routes/blog.js';
import teamRoutes from './routes/team.js';
import contactRoutes from './routes/contact.js';
import uploadRoutes from './routes/upload.js';
import settingsRoutes from './routes/settings.js';
import { errorHandler } from './middleware/errorHandler.js';
import Project from './models/Project.js';
import BlogPost from './models/BlogPost.js';

const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', globalLimiter);

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/settings', settingsRoutes);

app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send('User-agent: *\nAllow: /\nDisallow: /admin\n');
});

app.get('/sitemap.xml', async (req, res) => {
  try {
    const baseUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    const projects = await Project.find({ status: 'published' }).select('slug updatedAt');
    const posts = await BlogPost.find({ status: 'published' }).select('slug updatedAt');

    const staticRoutes = ['/', '/portfolio', '/services', '/about', '/blog', '/contact'];
    const urls = [
      ...staticRoutes.map((r) => `<url><loc>${baseUrl}${r}</loc></url>`),
      ...projects.map((p) => `<url><loc>${baseUrl}/portfolio/${p.slug}</loc><lastmod>${p.updatedAt.toISOString()}</lastmod></url>`),
      ...posts.map((p) => `<url><loc>${baseUrl}/blog/${p.slug}</loc><lastmod>${p.updatedAt.toISOString()}</lastmod></url>`),
    ];

    res.header('Content-Type', 'application/xml');
    res.send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}</urlset>`);
  } catch (err) {
    res.status(500).send('Error generating sitemap');
  }
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    if (process.env.NODE_ENV === 'development') {
      console.warn('Starting server without DB (development mode). Some features may be unavailable.');
      app.listen(PORT, () => console.log(`Server running on port ${PORT} (DB not connected)`));
    } else {
      process.exit(1);
    }
  });
