const express = require('express')
const router = express.Router()
const Category = require('../model/category')
const { geCatetByIdMiddleware } = require('../middleware/getCateByIdMiddleware')

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find()
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get a single category
router.get('/:id', geCatetByIdMiddleware, (req, res) => {
  res.json(res.category)
});

// Create a category
router.post('/', async (req, res) => {
  const category = new Category({
    name: req.body.name,
    slug: req.body.slug,
    description: req.body.description,
    image: req.body.image,
    parent: req.body.parent
  })
  try {
    const newCategory = await category.save()
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
});

// Update a category
router.patch('/:id', geCatetByIdMiddleware, async (req, res) => {
  if (req.body.name != null) {
    res.category.name = req.body.name
  }
  if (req.body.slug != null) {
    res.category.slug = req.body.slug
  }
  if (req.body.description != null) {
    res.category.description = req.body.description
  }
  if (req.body.image != null) {
    res.category.image = req.body.image
  }
  if (req.body.parent != null) {
    res.category.parent = req.body.parent
  }
  try {
    const updatedCategory = await res.category.save()
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Delete a category
router.delete('/:id', geCatetByIdMiddleware, async (req, res) => {
  try {
    await res.category.remove()
    res.json({ message: 'Category deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router