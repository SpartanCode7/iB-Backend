const express = require('express')
const router = express.Router()
const Category = require('../model/category')
const { getCateByIdMiddleware } = require('../middleware/getCateByIdMiddleware')
const multer = require('multer')
const { BAD_REQUEST, OK, INTERNAL_SERVER_ERROR } = require('../constant/httpCodes')

// Set up multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images'); // specify the directory where you want to save the file
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // use the original file name as the new file name
  }
});

const upload = multer({ storage: storage });

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find()
    res.json(categories)
  } catch (err) {
    res.status(BAD_REQUEST).json({ message: err.message })
  }
});

// Get a single category
router.get('/:id', getCateByIdMiddleware, (req, res) => {
  res.json(res.category);
});

// Create a category
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const category = new Category({
      name: req.body.name,
      slug: req.body.slug,
      description: req.body.description,
      image: req.file.filename, // save the file name in the database
      parent: req.body.parent
    });
    const newCategory = await category.save();
    res.status(OK).json(newCategory);
  } catch (err) {
    res.status(BAD_REQUEST).json({ message: err.message });
  }
});

// Update a category
router.patch('/:id', getCateByIdMiddleware, upload.single('image'), async (req, res) => {
  if (req.body.name != null) {
    res.category.name = req.body.name;
  }
  if (req.body.slug != null) {
    res.category.slug = req.body.slug;
  }
  if (req.body.description != null) {
    res.category.description = req.body.description;
  }
  if (req.file != null) {
    res.category.image = req.file.filename; // update image filename in the database
  }
  if (req.body.parent != null) {
    res.category.parent = req.body.parent;
  }
  try {
    const updatedCategory = await res.category.save();
    res.json(updatedCategory);
  } catch (err) {
    res.status(BAD_REQUEST).json({ message: err.message });
  }
});

// Delete a category
router.delete('/:id', getCateByIdMiddleware, async (req, res) => {
  try {
    await Category.deleteOne({ _id: req.params.id });
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(BAD_REQUEST).json({ message: err.message });
  }
});

module.exports = router;