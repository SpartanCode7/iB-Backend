const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  sku: {
    type: String,
    unique: true,
    required: true 
  },
  description: {
    type: String,
    required: true
  },
  category: [{ 
    type: String,
    ref: 'Category'
  }],
  price: {
    type: Number,
    required: true
  },
  salePrice: {
    type: Number
  },
  image: { 
    type: String,
    required: true
  },
  brand: {
    type: String
  },
  availability: {
    type: Number,
    required: true
  },
  tags: [{
    type: String
  }],
  attributes: [{ 
    name: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  }],
  variants: [{
    sku: {
      type: String,
      unique: true,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    salePrice: {
      type: Number
    },
    availability: {
      type: Number,
      required: true
    },
    attributes: [{
      name: {
        type: String,
        required: true
      },
      value: {
        type: String,
        required: true
      }
    }]
  }],
  reviews: [{
    type: Number,
    ref: 'Review'
  }],
  rating: {
    type: Number,
    default: 0
  },
});

const Product = mongoose.model('products', productSchema)

module.exports = Product


