const catchAsync = require('../util/catchAsync')
const Order = require('../models/order')

module.exports = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id)

  res.json({
    message: 'success',
    data: {
      order,
    },
  })
})
