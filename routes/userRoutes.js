import express from 'express';
import { registerUser } from '../controllers/userController.js';
import { loginUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);

router.get('/login', loginUser);

export default router;
