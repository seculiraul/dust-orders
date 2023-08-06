const Producer = require('../messaging/Producer')
const producer = new Producer()
const Order = require('../models/order')
const catchAsync = require('../util/catchAsync')

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

  await producer.publishMessage('Order_Created', order)

  res.status(201).json({
    message: 'success',
    data: {
      order,
    },
  })
})
