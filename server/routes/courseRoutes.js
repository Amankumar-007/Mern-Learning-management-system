import express from 'express';
const router = express.Router();

import isAuthenticated from '../middlewares/isAuthenticated.js';
import { createCourse } from '../controllers/courseController.js';


router.get("/", isAuthenticated, createCourse); // Fixed route
export default router;
