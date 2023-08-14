const Product = require('../models/product')
module.exports = async (productInfo) => {
  const product = await Product.findById(productInfo._id)

  if (!product) {
    const newProduct = new Product(productInfo)
    await newProduct.save()
  } else {
    await Product.findByIdAndUpdate(productInfo._id, productInfo)
  }
}
