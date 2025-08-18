const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const path = require('path');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contact');
const projectRoutes = require('./routes/projects');
const adminRoutes = require('./routes/admin');
const uploadRoutes = require('./routes/upload');

// Import middleware (single imports)
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https:", "blob:"],
            connectSrc: ["'self'"],
        },
    },
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
    message: {
        error: 'Too many requests from this IP, please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

// Compression middleware
app.use(compression());

// Logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// CORS configuration
const corsOptions = {
    origin: process.env.NODE_ENV === 'production'
        ? [process.env.FRONTEND_URL_PROD]
        : [process.env.FRONTEND_URL, 'http://localhost:3000'],
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Static files (uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Add a root route so GET / doesn't 404 in development
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: '🚀 Portfolio API is running',
        environment: process.env.NODE_ENV || 'development'
    });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV
    });
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/index.html'));
    });
}

// Error handling middleware (should be after routes)
app.use(notFound);
app.use(errorHandler);

// Database connection
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(
            process.env.NODE_ENV === 'production'
                ? process.env.MONGODB_URI_PROD
                : process.env.MONGODB_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        // show full error object and stack for debugging
        console.error('Database connection error (full):', error);
        // rethrow so startServer can handle it and we get a clear log
        throw error;
    }
};

// Start server
const startServer = async () => {
    try {
        await connectDB();
        const server = app.listen(PORT, () => {
            console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
            console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
        });
        // keep reference to close on unhandled rejections
        global.__server = server;
    } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
};

startServer();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.error('Unhandled Rejection:', err);
    if (global.__server) {
        global.__server.close(() => process.exit(1));
    } else {
        process.exit(1);
    }
});

module.exports = app;
