import express from 'express';
import {registerUser, login, search} from '../controller/user.controller';
import {authenticate} from '../middleware/authentication';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', login);
router.get('/', authenticate, search);

export default router;