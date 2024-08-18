import mongoose from 'mongoose';

const { Schema } = mongoose;

const DishSchema = new Schema({
  name: {
    type: String,
    unique:true,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number, // Price in currency units
    required: true
  },
  image: {
    type: String 
  },
  category: {
    type: String, // E.g., "Appetizer", "Main Course", "Dessert"
    required: true
  },
},{ timestamps: true });


const Dish = mongoose.model('Dish', DishSchema);

export default Dish;
