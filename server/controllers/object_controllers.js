import Object from '../models/object_model.js'

export const createObject = async (req, res) => {
    try {
        const { name, description, image, type, location, date } = req.body
        if (!name || !image || !type || !location || !date) {
            return res.status(400).json({ message: 'Missing required fields' })
        }

        const created = await Object.create({
            userId: req.user._id,
            name,
            description,
            image,
            type,
            location,
            date
        })

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
        return res.status(500).json({ message: 'Failed to create object' })
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