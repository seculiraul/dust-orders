const Order = require('../models/order')
const ApiError = require('../util/ApiError')
const catchAsync = require('../util/catchAsync')
module.exports = catchAsync(async (req, res, next) => {
  if (!req.currentUser) {
    return next(new ApiError('There is no user logged in', 403))
  }
  const orders = await Order.find({ userId: req.currentUser.id })

  res.status(200).json({
    message: req.currentUser.id,
    data: {
      orders,
    },
  })
})
