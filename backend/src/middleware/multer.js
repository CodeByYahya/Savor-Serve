// config/multer.js
import multer from 'multer';
import { fileURLToPath } from 'url';
import path from 'path';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the upload directory
    cb(null, path.join(__dirname, '../../public'));
  },
  filename: (req, file, cb) => {
    // Set the file name
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

// Create multer instance
const upload = multer({ storage });

export default upload;
