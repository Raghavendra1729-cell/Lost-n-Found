import User from '../models/user_model.js'
import generateToken from '../utils/auth_token.js'
import logger from '../utils/logger.js'

class AuthService {
    // Register new user
    async register(userData) {
        const { name, email, phone, password } = userData

        // Validation
        if (!name || !email || !phone || !password) {
            throw new Error('All fields are required')
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            throw new Error('Invalid email format')
        }

        // Phone validation
        const phoneRegex = /^\d{10}$/
        if (!phoneRegex.test(String(phone))) {
            throw new Error('Phone must be exactly 10 digits')
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            throw new Error('User already exists')
        }

        // Create user
        const user = await User.create({ name, email, phone, password })
        const token = generateToken(user._id)

        logger.info(`New user registered: ${email}`)

        return {
            user: this.sanitizeUser(user),
            token
        }
    }

    // Login user
    async login(credentials) {
        const { email, password } = credentials

        if (!email || !password) {
            throw new Error('All fields are required')
        }

        const user = await User.findOne({ email })
        if (!user) {
            throw new Error('User not found')
        }

        const isPasswordCorrect = await user.comparePassword(password)
        if (!isPasswordCorrect) {
            throw new Error('Invalid password')
        }

        const token = generateToken(user._id)
        logger.info(`User logged in: ${email}`)

        return {
            user: this.sanitizeUser(user),
            token
        }
    }

    // Google OAuth callback
    async handleGoogleCallback(profile) {
        try {
            // Check if user already exists with this Google ID
            let existingUser = await User.findOne({ googleId: profile.id })
            
            if (existingUser) {
                const token = generateToken(existingUser._id)
                logger.info(`Google user logged in: ${existingUser.email}`)
                return {
                    user: this.sanitizeUser(existingUser),
                    token,
                    needsPhone: !existingUser.phone || String(existingUser.phone).trim().length === 0
                }
            }
            
            // Check if user exists with same email
            existingUser = await User.findOne({ email: profile.emails[0].value })
            
            if (existingUser) {
                // Link Google account to existing user
                existingUser.googleId = profile.id
                existingUser.isGoogleAuth = true
                await existingUser.save()
                
                const token = generateToken(existingUser._id)
                logger.info(`Google account linked to existing user: ${existingUser.email}`)
                return {
                    user: this.sanitizeUser(existingUser),
                    token,
                    needsPhone: !existingUser.phone || String(existingUser.phone).trim().length === 0
                }
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

            const token = generateToken(newUser._id)
            logger.info(`New Google user created: ${newUser.email}`)

            return {
                user: this.sanitizeUser(newUser),
                token,
                needsPhone: true
            }
        } catch (error) {
            logger.error('Google OAuth error:', error)
            throw error
        }
    }

    // Update user phone
    async updatePhone(userId, phone) {
        if (!phone || String(phone).trim().length === 0) {
            throw new Error('Phone is required')
        }

        const phoneRegex = /^\d{10}$/
        if (!phoneRegex.test(String(phone))) {
            throw new Error('Phone must be exactly 10 digits')
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { $set: { phone } },
            { new: true }
        )

        if (!user) {
            throw new Error('User not found')
        }

        logger.info(`Phone updated for user: ${user.email}`)
        return this.sanitizeUser(user)
    }

    // Get user profile
    async getProfile(userId) {
        const user = await User.findById(userId)
        if (!user) {
            throw new Error('User not found')
        }
        return this.sanitizeUser(user)
    }

    // Sanitize user data (remove sensitive information)
    sanitizeUser(user) {
        const userObj = user.toObject()
        delete userObj.password
        return userObj
    }
}

export default new AuthService()
