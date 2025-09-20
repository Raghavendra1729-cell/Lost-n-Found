import jwt from 'jsonwebtoken'
import User from '../models/user_model.js'

const authMiddleware = async (req, res, next) => {
    const token = req.cookies?.token || req.header('Authorization')?.replace('Bearer ', '')
    
    if (!token) {
        return res.status(401).json({ 
            message: 'Access denied. No token provided.',
            redirectTo: '/login' 
        })
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.id)
        
        if (!user) {
            return res.status(401).json({ 
                message: 'User not found',
                redirectTo: '/api/auth/login'
            })
        }
        
        req.user = user
        next()
    } catch (error) {
        return res.status(401).json({ 
            message: 'Token is invalid or expired',
            redirectTo: '/api/auth/login'
        })
    }
}

export default authMiddleware