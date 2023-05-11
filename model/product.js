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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  price: {
    type: Number,
    required: true
  },
  salePrice: {
    type: Number
  },
  images: [{
    type: String
  }],
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  rating: {
    type: Number,
    default: 0
  },
  relatedProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }]
});

const Product = mongoose.model('products', productSchema)

module.exports = Product


