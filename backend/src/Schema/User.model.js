import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
      },
      password: {
        type: String,
        required: true
      },
} , { timestamps: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
  
    try {
      // Generate a salt and hash the password
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      next(error);
    }
  });

const User = mongoose.model('User', userSchema);

export default User;
