const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const auth = require('../middleware/auth');

// @route   GET api/categories
// @desc    Get all categories
// @access  Private
router.get('/', auth, categoryController.getAllCategories);

// @route   POST api/categories
// @desc    Create a new category
// @access  Private
router.post('/', auth, categoryController.createCategory);

module.exports = router;