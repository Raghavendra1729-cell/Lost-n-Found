import express from 'express'
import connectDB from './config/conifg.js'
import 'dotenv/config'
import cors from 'cors'
import session from 'express-session'
import passport from './config/passport.js'
import authRoutes from './routes/auth_routes.js'
import objectRoutes from './routes/object_routes.js'
import cookieParser from 'cookie-parser'

//initialize express app
const app = express()

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


//routes
app.use('/api/auth', authRoutes)
app.use('/api/objects', objectRoutes)





//start the server
app.listen(process.env.PORT, async () => {
    await connectDB()
    console.log(`Server is running on port ${process.env.PORT}`)
})


export default app;