import express from 'express';
const router = express.Router();

import { registerUser, loginUser, getUserProfile, updateUserProfile } from '../controllers/userController.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import upload from "../utils/multer.js"; // ✅ Import Multer for file uploads


router.post('/register', registerUser);
router.post('/login', loginUser);
router.get("/:id", isAuthenticated, getUserProfile); // Fixed route
router.put("/:id/update", isAuthenticated, upload.single("profilePhoto"), updateUserProfile);
export default router;
