const Order = require('../models/order')
const catchAsync = require('../util/catchAsync')
const producer = require('../messaging/Producer')
const Products = require('../models/product')

module.exports = catchAsync(async (req, res, next) => {
  const {
    total,
    transportCost,
    products,
    deliveryDetails,
    payMethod,
    deliveryOption,
  } = req.body

  console.log(req.currentUser)
  const order = await Order.create({
    total,
    transportCost,
    products,
    userId: req.currentUser ? req.currentUser.id : undefined,
    deliveryDetails,
    payMethod,
    deliveryOption,
  })

  producer.publishMessage('Order_Created', products)

  res.status(201).json({
    message: 'success',
    data: {
      order,
    },
  })
})
