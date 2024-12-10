import express from 'express'
import { receiveMessage, sendMessage } from '../controller/message.js'

const router=express.Router();
router.post('/receive/:userToChatId', receiveMessage);
router.post('/send/:receiverId', sendMessage);


export default router;