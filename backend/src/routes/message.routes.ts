import express from 'express';
import {sendMessage, fetchMessages } from '../controller/message.controller';
import {authenticate} from '../middleware/authentication';

const router = express.Router();

router.post('/', authenticate, sendMessage);
router.get('/:chatId', authenticate, fetchMessages);

export default router;