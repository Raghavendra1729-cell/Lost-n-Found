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
    // Generate and store CSRF state token for OAuth flow
    const state = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
    if (req.session) {
        req.session.oauthState = state
    }
    
    passport.authenticate('google', { scope: ['profile', 'email'], state })(req, res, next)
}

const googleCallback = (req, res, next) => {
    passport.authenticate('google', async (err, user) => {
        try {
            const baseClient = config.CLIENT_URL || 'http://localhost:5173'
            // Verify CSRF state token
            if (!req.session || req.query.state !== req.session.oauthState) {
                return res.redirect(`${baseClient}?auth=error&message=${encodeURIComponent('Invalid OAuth state')}`)
            }
            // Clear stored state
            if (req.session) delete req.session.oauthState

            if (err) {
                return res.redirect(`${baseClient}?auth=error&message=${encodeURIComponent(err.message)}`)
            }
            
            if (!user) {
                return res.redirect(`${baseClient}?auth=error&message=Authentication failed`)
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
            
            if (result.needsPhone) {
                return res.redirect(`${baseClient}?auth=success&needsPhone=true&token=${result.token}`)
            }
            
            res.redirect(`${baseClient}?auth=success&token=${result.token}`)
        } catch (error) {
            const baseClient = config.CLIENT_URL || 'http://localhost:5173'
            res.redirect(`${baseClient}?auth=error&message=${encodeURIComponent(error.message)}`)
        }
    })(req, res, next)
}

export { register, login, logout, getProfile, googleAuth, googleCallback, updatePhone }