import User from '../models/user_model.js'
import generateToken from '../utils/auth_token.js'
import passport from '../config/passport.js'
const register = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body
        if(!name || !email || !phone || !password) {
            return res.status(400).json({ message: 'All fields are required' })
        }
        const existingUser = await User.findOne({ email })
        if(existingUser) {
            return res.status(400).json({ message: 'User already exists' })
        }
        const user = await User.create({ name, email, phone, password })
        const token = generateToken(user._id)
        res.cookie('token', token, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', // Only secure in production
            sameSite: 'strict', 
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        })
        user.password = undefined // Remove password from response for security reasons
        res.status(201).json({ message: 'User created successfully', user })
    } catch (error) {
        console.error('Registration error:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if(!email || !password) {
            return res.status(400).json({ message: 'All fields are required' })
        }
        const user = await User.findOne({ email })
        if(!user) {
            return res.status(400).json({ message: 'User not found' })
        }
        const isPasswordCorrect = await user.comparePassword(password)
        if(!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid password' })
        }
        const token = generateToken(user._id)
        res.cookie('token', token, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', // Only secure in production
            sameSite: 'strict', 
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        })
        user.password = undefined // Remove password from response for security reasons
        res.status(200).json({ message: 'Logged in successfully', user })
    } catch (error) {
        console.error('Login error:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

const logout = async (req, res) => {
    try {
        res.cookie('token', '', { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict', 
            maxAge: 0 
        })
        res.status(200).json({ message: 'Logged out successfully' })
    } catch (error) {
        console.error('Logout error:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

const getProfile = async (req, res) => {
    try {
        // User is already available from authMiddleware
        const user = req.user
        user.password = undefined // Remove password from response
        res.status(200).json({ 
            message: 'Profile retrieved successfully', 
            user 
        })
    } catch (error) {
        console.error('Get profile error:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

// Google OAuth Controllers
const googleAuth = (req, res, next) => {
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next)
}

const googleCallback = (req, res, next) => {
    passport.authenticate('google', async (err, user) => {
        try {
            if (err) {
                return res.redirect(`${process.env.CLIENT_URL || 'http://localhost:5173'}?auth=error&message=${encodeURIComponent(err.message)}`)
            }
            
            if (!user) {
                return res.redirect(`${process.env.CLIENT_URL || 'http://localhost:5173'}?auth=error&message=Authentication failed`)
            }
            
            // Generate JWT token
            const token = generateToken(user._id)
            
            // Set cookie
            res.cookie('token', token, { 
                httpOnly: true, 
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict', 
                maxAge: 30 * 24 * 60 * 60 * 1000
            })
            
            // Remove password from response
            user.password = undefined
            
            // Redirect to frontend with success
            res.redirect(`${process.env.CLIENT_URL || 'http://localhost:5173'}?auth=success`)
        } catch (error) {
            console.error('Google callback error:', error)
            res.redirect(`${process.env.CLIENT_URL || 'http://localhost:5173'}?auth=error&message=${encodeURIComponent(error.message)}`)
        }
    })(req, res, next)
}

export { register, login, logout, getProfile, googleAuth, googleCallback }