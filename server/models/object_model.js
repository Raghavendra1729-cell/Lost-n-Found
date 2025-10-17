import mongoose from 'mongoose'

const objectSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    image: {
        url: {
            type: String,
            default: ''
        },
        publicId: {
            type: String,
            default: ''
        },
        width: {
            type: Number,
            default: null
        },
        height: {
            type: Number,
            default: null
        },
        format: {
            type: String,
            default: ''
        },
        size: {
            type: Number,
            default: null
        }
    },
    type: {
        type: String,
        enum: ['lost', 'found'],
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'resolved'],
        default: 'active'
    },
    location: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})

const Object = mongoose.model('Object', objectSchema)

export default Object