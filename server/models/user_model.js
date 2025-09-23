import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    // Basic Info
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function(value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                return emailRegex.test(value)
            },
            message: 'Invalid email format'
        }
    },
    phone: {
        type: String,
        required: function() {
            return !this.isGoogleAuth
        },
        trim: true,
        validate: {
            validator: function(value) {
                // Allow empty when Google auth, otherwise enforce 10 digits
                if (this.isGoogleAuth && (!value || String(value).trim().length === 0)) return true
                const phoneRegex = /^\d{10}$/
                return phoneRegex.test(value)
            },
            message: 'Phone must be exactly 10 digits'
        }
    },
    
    // Authentication
    password: {
        type: String,
        required: function() {
            return !this.isGoogleAuth
        }
    },
    isGoogleAuth: {
        type: Boolean,
        default: false
    },
    googleId: {
        type: String
    }

}, {
    timestamps: true // Adds createdAt and updatedAt automatically
})

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password') || this.isGoogleAuth) {
        return next()
    }
    
    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (error) {
        next(error)
    }
})

// Method to check password
userSchema.methods.comparePassword = async function(candidatePassword) {
    if (!this.password) return false
    return await bcrypt.compare(candidatePassword, this.password)
}


userSchema.index({ email: 1 })

const User = mongoose.model('User', userSchema)

export default User