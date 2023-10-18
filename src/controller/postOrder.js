const Order = require('../models/order')
const catchAsync = require('../util/catchAsync')
const rabbitMqClient = require('../messaging/RabbitMqClient')

module.exports = catchAsync(async (req, res, next) => {
  const {
    total,
    transportCost,
    products,
    deliveryDetails,
    payMethod,
    deliveryOption,
  } = req.body

  const order = await Order.create({
    total,
    transportCost,
    products,
    userId: req.currentUser ? req.currentUser.email : undefined,
    deliveryDetails,
    payMethod,
    deliveryOption,
  })

  rabbitMqClient.publishMessage('Order_Created', products)

  res.status(201).json({
    message: 'success',
    data: {
      order,
    },
  })
})
