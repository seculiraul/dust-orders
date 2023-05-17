const jwt = require('jsonwebtoken')

const validateUser = async (req, res, next) => {
  try {
    const cookies = req.cookies
    console.log(req)
    if (!cookies?.jwt)
      return res.status(403).json({
        message: 'not auth',
      })
    if (cookies.jwt) {
      const payload = await jwt.verify(cookies.jwt, process.env.JWT_SECRET)
      req.currentUser = payload
      return next()
    }
    return next()
  } catch (err) {
    console.log(err)
  }
}

module.exports = validateUser
