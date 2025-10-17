import ItemMessage from '../models/item_chat_model.js'

// Save a message to the database
export const saveItemMessage = async (itemId, senderId, senderName, content) => {
    try {
        const message = await ItemMessage.create({
            itemId,
            senderId,
            senderName,
            content,
            timestamp: new Date()
        })
        
        return message
    } catch (error) {
        console.error('Error saving item message:', error)
        throw error
    }
}

// Get all messages for an item
export const getItemMessages = async (req, res) => {
    try {
        const { itemId } = req.params
        
        const messages = await ItemMessage.find({ itemId })
            .sort({ timestamp: 1 }) // Oldest first
            .populate('senderId', 'name email')
        
        return res.json({ messages })
    } catch (error) {
        console.error('Error fetching item messages:', error)
        return res.status(500).json({ message: 'Failed to fetch messages' })
    }
}

// Delete all messages for an item (optional, for cleanup)
export const deleteItemMessages = async (req, res) => {
    try {
        const { itemId } = req.params
        
        await ItemMessage.deleteMany({ itemId })
        
        return res.json({ message: 'Messages deleted successfully' })
    } catch (error) {
        console.error('Error deleting item messages:', error)
        return res.status(500).json({ message: 'Failed to delete messages' })
    }
}

