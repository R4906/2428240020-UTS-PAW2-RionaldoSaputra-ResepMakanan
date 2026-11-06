import express from 'express'
import FakultasController from '../controllers/makanan.controller.js'
import { logMiddleware } from '../middleware/log.middleware.js'

const router = express.Router()

router.use(logMiddleware) 

router.get('/fakultas', FakultasController.index)
router.get('/fakultas/:id', FakultasController.show)
router.post('/fakultas', FakultasController.store)
router.put('/fakultas/:id', FakultasController.update)
router.patch('/fakultas/:id', FakultasController.update)
router.delete('/fakultas/:id', FakultasController.delete)

export default router