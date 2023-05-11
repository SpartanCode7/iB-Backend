const express = require('express');
const { route } = require('./categories');
const router = express.Router();
const Product = require('../model/product');
const { getProductByIdMiddleware } = require('../middleware/getProductByIdMiddleware');


// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single product
router.get('/:id', getProductByIdMiddleware, (req, res) => {
  res.json(res.product);
});

// configure multer to handle file uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, './uploads/');
//     },
//     filename: (req, file, cb) => {
//       cb(null, new Date().toISOString() + file.originalname);
//     }
//   });
//   const fileFilter = (req, file, cb) => {
//     // reject files that are not images
//     if (file.mimetype.startsWith('image/')) {
//       cb(null, true);
//     } else {
//       cb(new Error('Only image files are allowed.'), false);
//     }
//   };
//   const upload = multer({
//     storage: storage,
//     fileFilter: fileFilter
//   });
  


// Create a product
router.post('/', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    sku: req.body.sku,
    description: req.body.description,
    category: req.body.category,
    price: req.body.price,
    salePrice: req.body.salePrice,
    images: req.body.images,
    brand: req.body.brand,
    availability: req.body.availability,
    tags: req.body.tags,
    attributes: req.body.attributes,
    variants: req.body.variants,
    reviews: req.body.reviews,
    rating: req.body.rating,
    relatedProducts: req.body.relatedProducts
  })
  try {
    const newProduct = await product.save()
    res.status(201).json(newProduct)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
});

// Update a product
router.patch('/:id', getProductByIdMiddleware, async (req, res) => {
  if (req.body.name != null) {
    res.product.name = req.body.name
  }
  if (req.body.sku != null) {
    res.product.sku = req.body.sku
  }
  if (req.body.description != null) {
    res.product.description = req.body.description
  }
  if (req.body.category != null) {
    res.product.category = req.body.category
  }
  if (req.body.price != null) {
    res.product.price = req.body.price
  }
  if (req.body.salePrice != null) {
    res.product.salePrice = req.body.salePrice
  }
  if (req.body.images != null) {
    res.product.images = req.body.images
  }
  if (req.body.brand != null) {
    res.product.brand = req.body.brand
  }
  if (req.body.availability != null) {
    res.product.availability = req.body.availability
  }
  if (req.body.tags != null) {
    res.product.tags = req.body.tags
  }
  if (req.body.attributes != null) {
    res.product.attributes = req.body.attributes
  }
  if (req.body.variants != null) {
    res.product.variants = req.body.variants
  }
  if (req.body.reviews != null) {
    res.product.reviews = req.body.reviews
  }
  if (req.body.rating != null) {
    res.product.rating = req.body.rating
  }
  if (req.body.relatedProducts != null) {
    res.product.relatedProducts = req.body.relatedProducts
  }
  try {
    const updatedProduct = await res.product.save()
    res.json(updatedProduct)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Delete a product
router.delete('/:id', getProductByIdMiddleware, async (req, res) => {
  try {
    await res.product.remove()
    res.json({ message: 'Product deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router