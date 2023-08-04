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

  res.status(201).json({
    message: 'success',
    data: {
      order,
    },
  })
})
