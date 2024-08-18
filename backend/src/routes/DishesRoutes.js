import express from 'express';
import { createDish, getDishes } from '../controllers/Dish.controller.js';
import upload from '../middleware/multer.js';
const router = express.Router();

// Create a new dish
router.post('/create', upload.single('image'), createDish);
router.get('/getDish',getDishes);


export default router;
