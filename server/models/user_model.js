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
        trim: true
    },
    phone: {
        type: String,
        required: function() {
            return !this.isGoogleAuth
        },
        trim: true
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