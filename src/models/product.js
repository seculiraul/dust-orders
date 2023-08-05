const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
  name: {
    type: String,
  },
  code: String,
  sizes: {
    type: [
      {
        size: String,
        quantity: Number,
      },
    ],
  },
  price: Number,
  color: String,
  displayImage: String,
})

module.exports = mongoose.model('Products', productSchema)
