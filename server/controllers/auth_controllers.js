import authService from '../services/auth_service.js'
import passport from '../config/passport.js'
import config from '../config/config.js'
import { asyncHandler } from '../middlewares/error_middleware.js'

const register = asyncHandler(async (req, res) => {
    const result = await authService.register(req.body)
    
    // Set secure cookie
    res.cookie('token', result.token, { 
        httpOnly: true, 
        secure: config.NODE_ENV === 'production',
        sameSite: config.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 30 * 24 * 60 * 60 * 1000,
        path: '/'
    })
    
    res.status(201).json({ 
        success: true,
        message: 'User created successfully', 
        user: result.user, 
        token: result.token 
    })
})

const login = asyncHandler(async (req, res) => {
    const result = await authService.login(req.body)
    
    // Set secure cookie
    res.cookie('token', result.token, { 
        httpOnly: true, 
        secure: config.NODE_ENV === 'production',
        sameSite: config.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 30 * 24 * 60 * 60 * 1000,
        path: '/'
    })
    
    res.status(200).json({ 
        success: true,
        message: 'Logged in successfully', 
        user: result.user, 
        token: result.token 
    })
})

const logout = asyncHandler(async (req, res) => {
    res.cookie('token', '', { 
        httpOnly: true, 
        secure: config.NODE_ENV === 'production',
        sameSite: config.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 0,
        path: '/'
    })
    res.status(200).json({ 
        success: true,
        message: 'Logged out successfully' 
    })
})

const getProfile = asyncHandler(async (req, res) => {
    const user = await authService.getProfile(req.user._id)
    res.status(200).json({ 
        success: true,
        message: 'Profile retrieved successfully', 
        user 
    })
})

const updatePhone = asyncHandler(async (req, res) => {
    const user = await authService.updatePhone(req.user._id, req.body.phone)
    res.status(200).json({ 
        success: true,
        message: 'Phone updated', 
        user 
    })
})

// Google OAuth Controllers
const googleAuth = (req, res, next) => {
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next)
}

const googleCallback = (req, res, next) => {
    passport.authenticate('google', async (err, user) => {
        try {
            if (err) {
                return res.redirect(`${config.CLIENT_URL || 'http://localhost:5173'}?auth=error&message=${encodeURIComponent(err.message)}`)
            }
            
            if (!user) {
                return res.redirect(`${config.CLIENT_URL || 'http://localhost:5173'}?auth=error&message=Authentication failed`)
            }
            
            const result = await authService.handleGoogleCallback(user)
            
            // Set secure cookie
            res.cookie('token', result.token, { 
                httpOnly: true, 
                secure: config.NODE_ENV === 'production',
                sameSite: config.NODE_ENV === 'production' ? 'none' : 'lax',
                maxAge: 30 * 24 * 60 * 60 * 1000,
                path: '/'
            })
            
            const baseClient = config.CLIENT_URL || 'http://localhost:5173'
            if (result.needsPhone) {
                return res.redirect(`${baseClient}?auth=success&needsPhone=true&token=${result.token}`)
            }
            
            res.redirect(`${baseClient}?auth=success&token=${result.token}`)
        } catch (error) {
            res.redirect(`${config.CLIENT_URL || 'http://localhost:5173'}?auth=error&message=${encodeURIComponent(error.message)}`)
        }
    })(req, res, next)
}

export { register, login, logout, getProfile, googleAuth, googleCallback, updatePhone }