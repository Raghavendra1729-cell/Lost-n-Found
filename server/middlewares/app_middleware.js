import cors from 'cors'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import passport from '../config/passport.js'
import config from '../config/config.js'

// Security middleware - Force HTTPS in production
export const httpsRedirect = (req, res, next) => {
    if (config.NODE_ENV === 'production' && req.header('x-forwarded-proto') !== 'https') {
        res.redirect(`https://${req.header('host')}${req.url}`)
    } else {
        next()
    }
}

// Security headers middleware
export const securityHeaders = (req, res, next) => {
    // Prevent clickjacking
    res.setHeader('X-Frame-Options', 'DENY')
    // Prevent MIME type sniffing
    res.setHeader('X-Content-Type-Options', 'nosniff')
    // Enable XSS protection
    res.setHeader('X-XSS-Protection', '1; mode=block')
    // Strict Transport Security
    if (config.NODE_ENV === 'production') {
        res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
    }
    // Content Security Policy
    res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https:;")
    next()
}

// CORS configuration
export const corsConfig = cors({
    origin: [
        config.CLIENT_URL,
        config.CORS_ORIGIN,
        'http://localhost:5173' // Keep for local development
    ].filter(Boolean), // Remove any undefined values
    credentials: true
})

// Cookie parser middleware
export const cookieConfig = cookieParser()

// Session configuration
export const sessionConfig = session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: config.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: config.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 30 * 24 * 60 * 60 * 1000 
    }
})

// Passport middleware
export const passportConfig = () => {
    return [
        passport.initialize(),
        passport.session()
    ]
}
