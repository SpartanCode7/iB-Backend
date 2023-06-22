const express = require('express');
const router = express.Router();
const Product = require('../model/product');
const { getProductByIdMiddleware } = require('../middleware/getProductByIdMiddleware');
const multer = require('multer');

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

// Create a product
router.post('/', upload.single('image'), async (req, res) => {
  try {
    // Check if SKU already exists
    const existingProduct = await Product.findOne({ sku: req.body.sku });
    if (existingProduct) {
      return res.status(404).json({ message: 'Product with the same SKU already exists' });
    }

    const product = new Product({
      name: req.body.name,
      sku: req.body.sku,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      salePrice: req.body.salePrice,
      image: req.body.image,
      brand: req.body.brand,
      availability: req.body.availability,
      tags: req.body.tags,
      attributes: req.body.attributes,
      variants: req.body.variants,
      reviews: req.body.reviews,
      rating: req.body.rating,
    });

    const newProduct = await product.save();
    res.status(200).json(newProduct);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// Update a product
router.patch('/:id', getProductByIdMiddleware, upload.single('image'), async (req, res) => {
  try {
    // Find the product by ID
    const product = res.product;

    // Update the product fields
    if (req.body.name) {
      product.name = req.body.name;
    }
    if (req.body.sku) {
      product.sku = req.body.sku;
    }
    if (req.body.description) {
      product.description = req.body.description;
    }
    if (req.body.category) {
      product.category = req.body.category;
    }
    if (req.body.price) {
      product.price = req.body.price;
    }
    if (req.body.salePrice) {
      product.salePrice = req.body.salePrice;
    }
    if (req.file) {
      product.image = req.file.filename; // update image filename in the database
    }
    if (req.body.brand) {
      product.brand = req.body.brand;
    }
    if (req.body.availability) {
      product.availability = req.body.availability;
    }
    if (req.body.tags) {
      product.tags = req.body.tags;
    }
    if (req.body.attributes) {
      product.attributes = req.body.attributes;
    }
    if (req.body.variants) {
      product.variants = req.body.variants;
    }
    if (req.body.reviews) {
      product.reviews = req.body.reviews;
    }
    if (req.body.rating) {
      product.rating = req.body.rating;
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a product
router.delete('/:id', getProductByIdMiddleware, async (req, res) => {
  try {
    await Product.deleteOne({ _id: req.params.id });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
