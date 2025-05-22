import express from 'express';
import {createChat, getChats} from '../controller/chat.controller';
import {authenticate} from '../middleware/authentication';

const router = express.Router();

router.post('/', authenticate, createChat);
router.get('/', authenticate, getChats);

export default router;