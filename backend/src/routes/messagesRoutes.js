import express from 'express'
import { addMessage, establishMessageConnection, fetchMessage } from '../controllers/messagesControllers.js'
import { requireAuth } from '../middlewares/requireAuth.js';

const router = express.Router()

router.use(requireAuth);
router.post('/establish/:combinedUsername', establishMessageConnection)

router.put('/chat/update/:combinedUsername', addMessage)

router.get('/chat/fetch/:combinedUsername', fetchMessage)


export default router