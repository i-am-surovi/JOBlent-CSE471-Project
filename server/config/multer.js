import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure upload folder exists or create it
const uploadFolder = 'uploads';
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    // Create unique filename with timestamp + original extension
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

export default upload;
