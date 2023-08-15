const catchAsync = require('../util/catchAsync')
const Order = require('../models/order')

module.exports = catchAsync(async (req, res, next) => {
  const page = +req.query?.page ?? 1
  const limitFields = +req.query?.limit ?? +process.env.LIMIT_FIELDS
  const skip = (page - 1) * limitFields

  const orders = await Order.find()
    .sort({ datePlaced: -1 })
    .skip(skip)
    .limit(limitFields)
    .select('-__v')

  res.status(200).json({
    message: 'success',
    data: orders,
  })
})
