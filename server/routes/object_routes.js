import express from 'express'
import {
createObject,
getMyObjects,
getAllObjects,
getObjectById,
updateObject,
updateObjectStatus,
deleteObject,
getObjectMatches,
getMyArchive,
searchObjects,
getSmartMatches
} from '../controllers/object_controllers.js'
import {authMiddleware} from '../middlewares/auth_middleware.js'

const router = express.Router()

router.post('/', authMiddleware, createObject)
router.get('/me', authMiddleware, getMyObjects)
router.get('/all', authMiddleware, getAllObjects)
router.get('/me/archive', authMiddleware, getMyArchive)
router.get('/search', searchObjects) // Public search endpoint
router.get('/smart-matches', getSmartMatches) // Public smart matching endpoint
router.get('/:id', authMiddleware, getObjectById)
router.get('/:id/matches', authMiddleware, getObjectMatches)
router.patch('/:id', authMiddleware, updateObject)
router.patch('/:id/status', authMiddleware, updateObjectStatus)
router.delete('/:id', authMiddleware, deleteObject)

export default router