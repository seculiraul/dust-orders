const Product = require('../models/product')
module.exports = async (productInfo) => {
  const product = await Product.findById(productInfo._id)

  console.log(product)
  if (!product) {
    const newProduct = new Product(productInfo)
    await newProduct.save()
    console.log(newProduct)
  } else {
    await Product.findByIdAndUpdate(productInfo._id, productInfo)
  }
}
