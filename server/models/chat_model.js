import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  read: {
    type: Boolean,
    default: false
  }
})

const chatSchema = new mongoose.Schema({
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  messages: [messageSchema],
  lastMessage: {
    type: String,
    default: ''
  },
  lastMessageTime: {
    type: Date,
    default: Date.now
  },
  // Reference to the item that started this chat
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Object'
  },
  // Chat status
  status: {
    type: String,
    enum: ['active', 'resolved', 'archived'],
    default: 'active'
  },
  // Unread message counts for each participant
  unreadCounts: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    count: {
      type: Number,
      default: 0
    }
  }]
}, {
  timestamps: true
})

// Ensure participants array has exactly 2 users
chatSchema.pre('save', function(next) {
  if (this.participants.length !== 2) {
    return next(new Error('Chat must have exactly 2 participants'))
  }
  next()
})

// Index for faster queries
chatSchema.index({ participants: 1 })
chatSchema.index({ itemId: 1 })
chatSchema.index({ status: 1 })
chatSchema.index({ lastMessageTime: -1 })
chatSchema.index({ 'participants': 1, 'status': 1 })

// Compound index for efficient participant lookups
chatSchema.index({ participants: 1, lastMessageTime: -1 })

const Chat = mongoose.model('Chat', chatSchema)
const Message = mongoose.model('Message', messageSchema)

export default Chat
export { Message }
