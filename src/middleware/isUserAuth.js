const jwt = require('jsonwebtoken')
const ApiError = require('../util/ApiError')
const catchAsync = require('../util/catchAsync')

const validateUser = catchAsync(async (req, res, next) => {
  const cookies = req.cookies
  console.log(req.cookies)
  if (!cookies?.jwt) return next(new ApiError('User is not authenticated', 403))
  if (cookies.jwt) {
    const payload = await jwt.verify(cookies.jwt, process.env.JWT_SECRET)
    req.currentUser = payload
    return next()
  }
  return next()
})

module.exports = validateUser
