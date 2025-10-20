import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import connectDB from './config/database.js'
import config from './config/config.js'
import logger from './utils/logger.js'

// Import middleware
import { 
    httpsRedirect, 
    securityHeaders, 
    corsConfig, 
    cookieConfig, 
    sessionConfig, 
    passportConfig 
} from './middlewares/app_middleware.js'
import { errorHandler, notFound } from './middlewares/error_middleware.js'

// Import routes
import authRoutes from './routes/auth_routes.js'
import objectRoutes from './routes/object_routes.js'
import imageRoutes from './routes/image_routes.js'
import chatRoutes from './routes/chat_routes.js'
import userRoutes from './routes/user_routes.js'

// Import socket handlers
import { setupSocketHandlers } from './services/socket_service.js'

// Initialize Express app
const app = express()
const server = createServer(app)

// Apply middleware in order
app.use(httpsRedirect)                    // Force HTTPS in production
app.use(securityHeaders)                  // Security headers
app.use(express.json({ limit: '10mb' }))  // Parse JSON with size limit
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(cookieConfig)                     // Cookie parser
app.use(corsConfig)                       // CORS configuration
app.use(sessionConfig)                    // Session configuration
app.use(...passportConfig())              // Passport configuration

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: config.NODE_ENV,
        version: process.env.npm_package_version || '1.0.0'
    })
})

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/objects', objectRoutes)
app.use('/api/images', imageRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/users', userRoutes)

// 404 handler
app.use(notFound)

// Error handler (must be last)
app.use(errorHandler)

// Initialize Socket.IO
const io = new Server(server, {
    cors: {
        origin: [
            config.CLIENT_URL,
            config.CORS_ORIGIN,
            'http://localhost:5173'
        ].filter(Boolean),
        credentials: true
    }
})

// Setup socket handlers
setupSocketHandlers(io)

// Start server
const startServer = async () => {
    try {
        await connectDB()
        server.listen(config.PORT, () => {
            logger.info(`🚀 Server running in ${config.NODE_ENV} mode on port ${config.PORT}`)
            logger.info(`📡 Socket.IO server initialized`)
        })
    } catch (error) {
        logger.error('Failed to start server:', error)
        process.exit(1)
    }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    logger.error('Unhandled Promise Rejection:', err)
    server.close(() => {
        process.exit(1)
    })
})

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception:', err)
    process.exit(1)
})

// Graceful shutdown
process.on('SIGTERM', () => {
    logger.info('SIGTERM received. Shutting down gracefully...')
    server.close(() => {
        logger.info('Process terminated')
    })
})

startServer()

export default app