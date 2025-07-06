import express from 'express';
import { getCourseRecommendations } from '../controller/gptController.js';
import auth from '../middleware/authMiddleware.js';
import role from '../middleware/roleMiddlware.js';

const router = express.Router();

router.post('/recommend', auth, role(['student']), getCourseRecommendations);

export default router;