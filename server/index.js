import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import postRoutes from './routes/posts.js';

// Validate required environment variables
if (!process.env.MONGO_URI) {
  console.error('❌ MONGO_URI is not defined in environment variables');
  process.exit(1);
}

const app = express();

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Middleware
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

// Routes
app.use('/posts', postRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message,
    code: err.code || 'INTERNAL_ERROR'
  });
});

const PORT = process.env.PORT || 5000;

// MongoDB connection
const db = mongoose.connection;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds of not being able to connect
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
});

// Connection events
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('✅ Connected to MongoDB');
  
  // Add root route
  app.get('/', (req, res) => {
    res.json({
      status: 'success',
      message: 'Server is running',
      timestamp: new Date().toISOString(),
      routes: {
        posts: '/posts',
        'single post': '/posts/:id',
        'like post': '/posts/:id/likePost',
        'update post': '/posts/:id'
      }
    });
  });

  // Add health check endpoint
  app.get('/health', (req, res) => {
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      db: db.readyState === 1 ? 'connected' : 'disconnected'
    });
  });

  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
});

// Graceful shutdown
process.on('SIGINT', () => {
  db.close(() => {
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  });
});
