import jwt from 'jsonwebtoken'
import User from '../models/user_model.js'

const authMiddleware = async (req, res, next) => {
    console.log('🔍 Auth middleware - checking request...')
    console.log('🔍 Cookies:', req.cookies)
    console.log('🔍 Headers:', req.headers)
    
    const token = req.cookies?.token || req.header('Authorization')?.replace('Bearer ', '')
    console.log('🔍 Token found:', !!token)
    
    if (!token) {
        console.log('❌ No token provided')
        return res.status(401).json({ 
            message: 'Access denied. No token provided.',
            redirectTo: '/login' 
        })
    }
    
    try {
        console.log('🔍 Verifying JWT token...')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log('🔍 Token decoded:', decoded)
        
        const user = await User.findById(decoded.id)
        console.log('🔍 User found:', !!user)
        
        if (!user) {
            console.log('❌ User not found in database')
            return res.status(401).json({ 
                message: 'User not found',
                redirectTo: '/api/auth/login'
            })
        }
        
        console.log('✅ Authentication successful for user:', user.email)
        req.user = user
        next()
    } catch (error) {
        console.log('❌ JWT verification failed:', error.message)
        return res.status(401).json({ 
            message: 'Token is invalid or expired',
            redirectTo: '/api/auth/login'
        })
    }
}

const requirePhoneMiddleware = (req, res, next) => {
    const user = req.user
    if (!user || !user.phone || user.phone.trim().length === 0) {
        return res.status(400).json({
            message: 'Phone number required to perform this action.'
        })
    }
    next()
}
export {authMiddleware, requirePhoneMiddleware}
