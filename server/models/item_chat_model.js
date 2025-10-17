import mongoose from 'mongoose'

const itemMessageSchema = new mongoose.Schema({
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Object',
        required: true,
        index: true
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    senderName: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})

// Index for faster queries
itemMessageSchema.index({ itemId: 1, timestamp: -1 })

const ItemMessage = mongoose.model('ItemMessage', itemMessageSchema)

export default ItemMessage

