import express from 'express';
const router = express.Router();

import { registerUser, loginUser, getUserProfile } from '../controllers/userController.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get("/:id", isAuthenticated, getUserProfile); // Fixed route

export default router;
