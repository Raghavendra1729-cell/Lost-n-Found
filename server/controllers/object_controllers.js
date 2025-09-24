import Object from '../models/object_model.js'

export const createObject = async (req, res) => {
    try {
        const { name, description, image, type, location, date } = req.body
        
        // Validate required fields
        if (!name || !type || !location) {
            return res.status(400).json({ 
                message: 'Missing required fields: name, type, and location are required',
                received: { name: !!name, type: !!type, location: !!location }
            })
        }

        // Prepare object data with defaults
        const objectData = {
            userId: req.user._id,
            name: name.trim(),
            description: description ? description.trim() : 'No description provided',
            image: image ? image.trim() : 'https://via.placeholder.com/300x200?text=No+Image',
            type,
            location: location.trim(),
            date: date ? new Date(date) : new Date()
        }

        console.log('Creating object with data:', objectData)

        const created = await Object.create(objectData)

        const oppositeType = type === 'lost' ? 'found' : 'lost'
        const text = [name, description].filter(Boolean).join(' ')
        const tokens = text
            .toLowerCase()
            .split(/[^a-z0-9]+/)
            .filter(Boolean)
            .slice(0, 5)
            .join('|')

        const regex = tokens ? new RegExp(tokens, 'i') : null

        const matchQuery = {
            type: oppositeType,
            status: 'active',
            location: new RegExp(`^${location}$`, 'i')
        }

        if (regex) {
            matchQuery.$or = [
                { name: regex },
                { description: regex }
            ]
        }

        const matches = await Object.find(matchQuery)
            .sort({ createdAt: -1 })
            .limit(20)

        return res.status(201).json({ object: created, matches })
    } catch (error) {
        console.error('Error creating object:', error)
        return res.status(500).json({ 
            message: 'Failed to create object',
            error: error.message,
            details: error.name === 'ValidationError' ? error.errors : undefined
        })
    }
}

export const getMyObjects = async (req, res) => {
    try {
        const { type, status } = req.query
        const query = { userId: req.user._id }
        if (type) query.type = type
        if (status) query.status = status
        const results = await Object.find(query).sort({ createdAt: -1 })
        return res.json({ results })
    } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch objects' })
    }
}

export const getMyArchive = async (req, res) => {
    try {
        const results = await Object.find({ userId: req.user._id, status: 'resolved' })
            .sort({ updatedAt: -1 })
        return res.json({ results })
    } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch archive' })
    }
}

export const getObjectById = async (req, res) => {
    try {
        const obj = await Object.findOne({ _id: req.params.id, userId: req.user._id })
        if (!obj) return res.status(404).json({ message: 'Not found' })
        return res.json({ object: obj })
    } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch object' })
    }
}

export const getObjectMatches = async (req, res) => {
    try {
        const obj = await Object.findOne({ _id: req.params.id, userId: req.user._id })
        if (!obj) return res.status(404).json({ message: 'Not found' })

        const oppositeType = obj.type === 'lost' ? 'found' : 'lost'
        const text = [obj.name, obj.description].filter(Boolean).join(' ')
        const tokens = text
            .toLowerCase()
            .split(/[^a-z0-9]+/)
            .filter(Boolean)
            .slice(0, 5)
            .join('|')

        const regex = tokens ? new RegExp(tokens, 'i') : null

        const matchQuery = {
            type: oppositeType,
            status: 'active',
            location: new RegExp(`^${obj.location}$`, 'i')
        }
        if (regex) {
            matchQuery.$or = [ { name: regex }, { description: regex } ]
        }

        const matches = await Object.find(matchQuery).sort({ createdAt: -1 }).limit(50)
        return res.json({ object: obj, matches })
    } catch (error) {
        return res.status(500).json({ message: 'Failed to find matches' })
    }
}

export const updateObject = async (req, res) => {
    try {
        const allowed = ['name', 'description', 'image', 'location', 'date']
        const updates = {}
        for (const key of allowed) {
            if (key in req.body) updates[key] = req.body[key]
        }
        const updated = await Object.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            { $set: updates },
            { new: true }
        )
        if (!updated) return res.status(404).json({ message: 'Not found' })
        return res.json({ object: updated })
    } catch (error) {
        return res.status(500).json({ message: 'Failed to update object' })
    }
}

export const updateObjectStatus = async (req, res) => {
    try {
        const { status } = req.body
        if (!['active', 'resolved'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' })
        }
        const updated = await Object.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            { $set: { status } },
            { new: true }
        )
        if (!updated) return res.status(404).json({ message: 'Not found' })
        return res.json({ object: updated })
    } catch (error) {
        return res.status(500).json({ message: 'Failed to update status' })
    }
}

export const deleteObject = async (req, res) => {
    try {
        const deleted = await Object.findOneAndDelete({ _id: req.params.id, userId: req.user._id })
        if (!deleted) return res.status(404).json({ message: 'Not found' })
        return res.status(204).send()
    } catch (error) {
        return res.status(500).json({ message: 'Failed to delete object' })
    }
}

export const searchObjects = async (req, res) => {
    try {
        const { query, location, type, date } = req.query
        
        // Build search query
        const searchQuery = { status: 'active' }
        
        // Add type filter (lost/found)
        if (type && type !== 'all') {
            searchQuery.type = type
        }
        
        // Add location filter
        if (location) {
            searchQuery.location = new RegExp(location, 'i')
        }
        
        // Add date filter (items from last X days)
        if (date) {
            const daysAgo = new Date()
            daysAgo.setDate(daysAgo.getDate() - parseInt(date))
            searchQuery.createdAt = { $gte: daysAgo }
        }
        
        // Add text search
        if (query) {
            const textRegex = new RegExp(query, 'i')
            searchQuery.$or = [
                { name: textRegex },
                { description: textRegex }
            ]
        }
        
        // Execute search with pagination
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 20
        const skip = (page - 1) * limit
        
        const results = await Object.find(searchQuery)
            .populate('userId', 'name email') // Include user info but not sensitive data
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
        
        // Get total count for pagination
        const total = await Object.countDocuments(searchQuery)
        
        return res.json({
            results,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        })
    } catch (error) {
        console.error('Search error:', error)
        return res.status(500).json({ message: 'Failed to search objects' })
    }
}

export const getSmartMatches = async (req, res) => {
    try {
        const { name, description, location, type } = req.query
        
        if (!name || !location || !type) {
            return res.status(400).json({ message: 'Name, location, and type are required' })
        }
        
        // Find opposite type items in same location
        const oppositeType = type === 'lost' ? 'found' : 'lost'
        
        // Build smart matching query
        const text = [name, description].filter(Boolean).join(' ')
        const tokens = text
            .toLowerCase()
            .split(/[^a-z0-9]+/)
            .filter(Boolean)
            .slice(0, 8) // More tokens for better matching
        
        const regex = tokens.length > 0 ? new RegExp(tokens.join('|'), 'i') : null
        
        const matchQuery = {
            type: oppositeType,
            status: 'active',
            location: new RegExp(`^${location}$`, 'i')
        }
        
        if (regex) {
            matchQuery.$or = [
                { name: regex },
                { description: regex }
            ]
        }
        
        // Get matches with similarity scoring
        const matches = await Object.find(matchQuery)
            .populate('userId', 'name email')
            .sort({ createdAt: -1 })
            .limit(50)
        
        // Calculate similarity scores
        const scoredMatches = matches.map(match => {
            let score = 0
            
            // Location match (exact)
            if (match.location.toLowerCase() === location.toLowerCase()) {
                score += 50
            }
            
            // Name similarity
            const nameWords = name.toLowerCase().split(/\s+/)
            const matchNameWords = match.name.toLowerCase().split(/\s+/)
            const nameMatches = nameWords.filter(word => 
                matchNameWords.some(matchWord => 
                    matchWord.includes(word) || word.includes(matchWord)
                )
            ).length
            score += (nameMatches / nameWords.length) * 30
            
            // Description similarity
            if (description && match.description) {
                const descWords = description.toLowerCase().split(/\s+/)
                const matchDescWords = match.description.toLowerCase().split(/\s+/)
                const descMatches = descWords.filter(word => 
                    matchDescWords.some(matchWord => 
                        matchWord.includes(word) || word.includes(matchWord)
                    )
                ).length
                score += (descMatches / descWords.length) * 20
            }
            
            return { ...match.toObject(), similarityScore: Math.round(score) }
        })
        
        // Sort by similarity score
        scoredMatches.sort((a, b) => b.similarityScore - a.similarityScore)
        
        return res.json({
            matches: scoredMatches.filter(match => match.similarityScore > 20), // Only show matches with >20% similarity
            totalFound: matches.length
        })
    } catch (error) {
        console.error('Smart matching error:', error)
        return res.status(500).json({ message: 'Failed to find smart matches' })
    }
}