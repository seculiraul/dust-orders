const catchAsync = require('../util/catchAsync')
const Order = require('../models/order')

module.exports = catchAsync(async (req, res, next) => {
  const orders = await Order.find()

  res.status(200).json({
    message: 'success',
    data: orders,
  })
})
