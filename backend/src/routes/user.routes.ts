import express from 'express';
import {registerUser, login} from '../controller/user.controller';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', login);

export default router;