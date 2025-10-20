import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import User from '../models/user_model.js'
import config from './config.js'

// Configure Google OAuth Strategy (guarded by env checks so deploys don't crash)
const hasGoogleCreds = Boolean(config.GOOGLE_CLIENT_ID && config.GOOGLE_CLIENT_SECRET)

if (hasGoogleCreds) {
    passport.use(new GoogleStrategy({
        clientID: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET,
        callbackURL: config.NODE_ENV === 'production' 
            ? `${config.BACKEND_URL}/api/auth/google/callback`
            : `${config.BACKEND_URL || 'http://localhost:3000'}/api/auth/google/callback`
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            // Check if user already exists with this Google ID
            let existingUser = await User.findOne({ googleId: profile.id })
            
            if (existingUser) {
                return done(null, existingUser)
            }
            
            // Check if user exists with same email
            existingUser = await User.findOne({ email: profile.emails[0].value })
            
            if (existingUser) {
                // Link Google account to existing user
                existingUser.googleId = profile.id
                existingUser.isGoogleAuth = true
                await existingUser.save()
                return done(null, existingUser)
            }
            
            // Create new user
            const newUser = await User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                phone: '', // Google doesn't provide phone number
                googleId: profile.id,
                isGoogleAuth: true,
                password: '' // No password for Google auth users
            })
            
            return done(null, newUser)
        } catch (error) {
            console.error('Google OAuth error:', error)
            return done(error, null)
        }
    }))
} else {
    console.warn('Google OAuth disabled: Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET')
}

// Serialize user for session
passport.serializeUser((user, done) => {
    done(null, user._id)
})

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id)
        done(null, user)
    } catch (error) {
        done(error, null)
    }
})

export default passport
