const jwt = require('jsonwebtoken')
const ApiError = require('../util/ApiError')
const catchAsync = require('../util/catchAsync')

const validateUser = catchAsync(async (req, res, next) => {
  const token = req?.headers?.authorization?.split(' ')?.[1]
  // NEED TO MAKE 2 FUNCTIONS ONE THAT VALIDATES THE USER AND ONE ONLY
  //TO SEE IF THERE IS AN USER BUT
  //if (!cookies?.jwt) return next(new ApiError('User is not authenticated', 403))
  if (token) {
    const payload = await jwt.verify(token, process.env.JWT_SECRET)
    req.currentUser = payload
    return next()
  }
  return next()
})

module.exports = validateUser
