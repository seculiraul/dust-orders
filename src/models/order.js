const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
  status: {
    type: String,
    enum: ['Placed', 'Delivering', 'Complete', 'Cancelled'],
    default: 'Placed',
  },
  products: {
    type: [
      {
        productId: {
          type: mongoose.Schema.ObjectId,
          ref: 'products',
        },
        quantity: Number,
      },
    ],
  },
  datePlaced: {
    type: Date,
    default: Date.now(),
  },
  total: Number,
  transportCost: Number,
  userId: {
    type: String,
  },
  deliveryDetails: {
    type: {
      firstName: String,
      lastName: String,
      address: String,
      city: String,
      region: String,
      phone: String,
      email: String,
    },
  },
  payMethod: {
    type: String,
    enum: ['card', 'paypal', 'delivery'],
  },
  deliveryOption: {
    type: String,
    enum: ['fastCourier', 'standardCourier', 'post'],
  },
})

module.exports = mongoose.model('Orders', orderSchema)
