import User from '../models/user_model.js'

// Search users by name or email
export const searchUsers = async (req, res) => {
    try {
        const { q: searchTerm } = req.query
        const currentUserId = req.user._id

        if (!searchTerm || searchTerm.length < 2) {
            return res.status(400).json({
                success: false,
                message: 'Search term must be at least 2 characters long'
            })
        }

        console.log('🔍 Searching users with term:', searchTerm)

        // Search users by name or email, excluding current user
        const users = await User.find({
            _id: { $ne: currentUserId }, // Exclude current user
            $or: [
                { name: { $regex: searchTerm, $options: 'i' } },
                { email: { $regex: searchTerm, $options: 'i' } }
            ]
        }).select('name email _id createdAt').limit(10)

        console.log('✅ Found users:', users.length)

        res.json({
            success: true,
            users: users
        })
    } catch (error) {
        console.error('❌ Search users error:', error)
        res.status(500).json({
            success: false,
            message: 'Failed to search users'
        })
    }
}

// Get user by ID
export const getUserById = async (req, res) => {
    try {
        const { userId } = req.params

        const user = await User.findById(userId).select('name email _id createdAt')

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        res.json({
            success: true,
            user: user
        })
    } catch (error) {
        console.error('❌ Get user error:', error)
        res.status(500).json({
            success: false,
            message: 'Failed to get user'
        })
    }
}
