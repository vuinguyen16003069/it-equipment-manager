require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const path = require('node:path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const app = express();
const setupRoutes = require('./routes/index');

// Security headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'i.ibb.co', 'images.unsplash.com'],
        scriptSrcAttr: ["'unsafe-inline'"],
      },
    },
  }),
);

// Database connection – exit if unreachable
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('\x1b[32m%s\x1b[0m', '✅ MongoDB connected successfully!'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Suppress favicon 404
app.get('/favicon.ico', (_req, res) => res.sendStatus(204));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Expose decoded user to all views
app.use((req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    try {
      res.locals.user = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      res.locals.user = null;
    }
  } else {
    res.locals.user = null;
  }
  next();
});

// Routes
setupRoutes(app);

module.exports = app;
