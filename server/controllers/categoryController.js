const path = require('path');
const multer = require('multer');
const Category = require('../models/Category');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, 'category-' + uniqueSuffix + ext);
  }
});

// File validation
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Error: Only image files (jpeg, jpg, png, gif, webp) are allowed!'));
  }
};

const upload = multer({
  storage: storage,
  limits: { 
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: fileFilter
}).single('image');

exports.createCategory = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        console.error('Upload error:', err);
        return res.status(400).json({ 
          success: false,
          message: err.message || 'File upload failed'
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No image file provided'
        });
      }

      // Create relative path for database storage
      const imagePath = path.relative(path.join(__dirname, '../'), req.file.path);

      const category = new Category({
        name: req.body.name,
        itemCount: req.body.itemCount,
        image: imagePath.replace(/\\/g, '/'), // Convert to forward slashes
        createdBy: req.user.id
      });

      await category.save();
      
      res.status(201).json({
        success: true,
        data: {
          _id: category._id,
          name: category.name,
          itemCount: category.itemCount,
          image: `/uploads/${path.basename(imagePath)}`,
          createdBy: category.createdBy,
          createdAt: category.createdAt
        }
      });
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({ createdBy: req.user.id })
      .sort({ createdAt: -1 })
      .select('-__v');

    res.json({
      success: true,
      count: categories.length,
      data: categories.map(cat => ({
        ...cat._doc,
        image: `${req.protocol}://${req.get('host')}${cat.image}`
      }))
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};