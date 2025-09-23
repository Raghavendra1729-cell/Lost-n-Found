import express from 'express'
import {
createObject,
getMyObjects,
getObjectById,
updateObject,
updateObjectStatus,
deleteObject,
getObjectMatches,
getMyArchive
} from '../controllers/object_controllers.js'
import {authMiddleware} from '../middlewares/auth_middleware.js'

const router = express.Router()

router.post('/', authMiddleware, createObject)
router.get('/me', authMiddleware, getMyObjects)
router.get('/me/archive', authMiddleware, getMyArchive)
router.get('/:id', authMiddleware, getObjectById)
router.get('/:id/matches', authMiddleware, getObjectMatches)
router.patch('/:id', authMiddleware, updateObject)
router.patch('/:id/status', authMiddleware, updateObjectStatus)
router.delete('/:id', authMiddleware, deleteObject)

export default router