import { saveMessage } from '../controllers/chat_controllers.js'
import logger from '../utils/logger.js'

export const setupSocketHandlers = (io) => {
    io.on('connection', (socket) => {
        logger.info(`User connected: ${socket.id}`)

        // Join chat room
        socket.on('join-chat', (chatId) => {
            socket.join(chatId)
            logger.info(`User ${socket.id} joined chat ${chatId}`)
        })

        // Leave chat room
        socket.on('leave-chat', (chatId) => {
            socket.leave(chatId)
            logger.info(`User ${socket.id} left chat ${chatId}`)
        })

        // Handle new message
        socket.on('send-message', async (data) => {
            try {
                const { chatId, senderId, content } = data
                
                // Save message to database
                const message = await saveMessage(chatId, senderId, content)
                
                // Emit message to all users in the chat room
                io.to(chatId).emit('new-message', {
                    message,
                    chatId
                })
                
                logger.info(`Message sent in chat ${chatId} by user ${senderId}`)
            } catch (error) {
                logger.error('Error sending message:', error)
                socket.emit('message-error', { error: 'Failed to send message' })
            }
        })

        socket.on('disconnect', () => {
            logger.info(`User disconnected: ${socket.id}`)
        })
    })
}
