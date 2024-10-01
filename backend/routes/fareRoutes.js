import express from 'express';
import { calculateFare } from '../controllers/fareController.js';

const router = express.Router();

// POST route to calculate fare and store data
router.post('/calculate-fare', calculateFare);

export default router;
