import express from 'express'
import MessageController from './controllers/Message.controller'
const router = express.Router()

router.post('/', (request, response) => new MessageController(request, response).create())
router.get('/', (request, response) => new MessageController(request, response).search())

export default router
