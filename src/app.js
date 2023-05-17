const express = require('express')
const cors = require('cors')
const orderRoutes = require('./routes/orderRoutes')
const allowedOrigins = require('./allowedOrigins')
const credentials = require('./middleware/credentials')
const cookieParser = require('cookie-parser')
const app = express()

app.use(credentials)
app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true)
      } else {
        callback(new Error('Not Allowed By CORS'))
      }
    },
    optionsSuccessStatus: 200,
  })
)
app.use(express.json())
app.use(cookieParser())

app.use(orderRoutes)

app.use('/test', (req, res) => {
  res.json({
    message: 'success',
  })
})

module.exports = app
