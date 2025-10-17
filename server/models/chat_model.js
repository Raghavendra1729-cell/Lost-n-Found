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
    trim: true
  },
  timestamp: {
    type: Date,
    default: Date.now
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
  }
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

const Chat = mongoose.model('Chat', chatSchema)
const Message = mongoose.model('Message', messageSchema)

export default Chat
export { Message }
