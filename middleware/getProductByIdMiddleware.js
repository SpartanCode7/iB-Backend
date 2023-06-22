const Product = require('../model/product')

async function getProductByIdMiddleware(req, res, next) {
  let product
  try {
    product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
  res.product = product
  next()
}

module.exports = { getProductByIdMiddleware }