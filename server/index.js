import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import connectDB from './config/database.js'
import 'dotenv/config'
import cors from 'cors'
import session from 'express-session'
import passport from './config/passport.js'
import authRoutes from './routes/auth_routes.js'
import objectRoutes from './routes/object_routes.js'
import imageRoutes from './routes/image_routes.js'
import chatRoutes from './routes/chat_routes.js'
import userRoutes from './routes/user_routes.js'
import cookieParser from 'cookie-parser'
import { saveMessage } from './controllers/chat_controllers.js'

//initialize express app
const app = express()
const server = createServer(app)

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    origin: ['http://localhost:5173'], 
    credentials: true
}))

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-session-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30 * 24 * 60 * 60 * 1000 
    }
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())


// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  })
})

//routes
app.use('/api/auth', authRoutes)
app.use('/api/objects', objectRoutes)
app.use('/api/images', imageRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/users', userRoutes)





// Initialize Socket.IO
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173'],
        credentials: true
    }
})

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('User connected:', socket.id)

    // Join chat room
    socket.on('join-chat', (chatId) => {
        socket.join(chatId)
        console.log(`User ${socket.id} joined chat ${chatId}`)
    })

    // Leave chat room
    socket.on('leave-chat', (chatId) => {
        socket.leave(chatId)
        console.log(`User ${socket.id} left chat ${chatId}`)
    })

    // Handle new message
    socket.on('send-message', async (data) => {
        try {
            const { chatId, senderId, content } = data
            
            // Save message to database
            const message = await saveMessage(chatId, senderId, content)
            
            // Emit message to all users in the chat room
            io.to(chatId).emit('new-message', {
                message,
                chatId
            })
        } catch (error) {
            console.error('Error sending message:', error)
            socket.emit('message-error', { error: 'Failed to send message' })
        }
    })

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id)
    })
})

//start the server
server.listen(process.env.PORT, async () => {
    await connectDB()
    console.log(`Server is running on port ${process.env.PORT}`)
})


export default app;