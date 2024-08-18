import Dish from "../Schema/Dish.model.js";
import cloudinary from "../middleware/cloudinary.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert __dirname to ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createDish = async (req, res) => {
  const { name, description, price, category } = req.body;
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim() === '') {
    errors.push('Name is required and must be a non-empty string.');
  }
  if (!description || typeof description !== 'string' || description.trim() === '') {
    errors.push('Description is required and must be a non-empty string.');
  }

  if (!category || typeof category !== 'string' || category.trim() === '') {
    errors.push('Category is required and must be a non-empty string.');
  }


  let imageUrl = null;
  if (req.file) {
    try {
      const filePath = path.join(__dirname, '../../public', req.file.filename);

      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'dishes', // specify a folder on Cloudinary
      });
      imageUrl = result.secure_url;
      fs.unlinkSync(filePath);
    } catch (error) {
      errors.push('Failed to upload image to Cloudinary.');
    }
  } else {
    errors.push('Image file is required.');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const dish = new Dish({
      name,
      description,
      price,
      image: imageUrl,
      category,
    });
    await dish.save();
    res.status(201).json({ message: 'Dish added successfully', dish });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// controller for updating dish
export const updateDish = async (req, res) => {
  const { name, description, price, image, category } = req.body;
  const errors = [];

  // Validate dish data
  if (name && (typeof name !== 'string' || name.trim() === '')) {
    errors.push('Name must be a non-empty string.');
  }
  if (description && (typeof description !== 'string' || description.trim() === '')) {
    errors.push('Description must be a non-empty string.');
  }
  if (price && (typeof price !== 'number' || price <= 0)) {
    errors.push('Price must be a positive number.');
  }
  if (category && (typeof category !== 'string' || category.trim() === '')) {
    errors.push('Category must be a non-empty string.');
  }
  if (image && (typeof image !== 'string' || !/^https?:\/\/[^\s]+$/.test(image))) {
    errors.push('Image must be a valid URL if provided.');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const dish = await Dish.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!dish) return res.status(404).json({ message: 'Dish not found' });
    res.status(200).json(dish);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all dishes
export const getDishes = async (req, res) => {
  try {
    const dishes = await Dish.find();
    console.log(dishes)
    res.status(200).json(dishes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single dish by ID
export const getDishById = async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id);
    if (!dish) return res.status(404).json({ message: 'Dish not found' });
    res.status(200).json(dish);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a dish by ID
export const deleteDish = async (req, res) => {
  try {
    const dish = await Dish.findByIdAndDelete(req.params.id);
    if (!dish) return res.status(404).json({ message: 'Dish not found' });
    res.status(200).json({ message: 'Dish deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
