const dotenv = require('dotenv').config({ path: __dirname + '/../config.env' })
const mongoose = require('mongoose')
const app = require('./app')
const producer = require('./messaging/Producer')

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    producer.createChannel()
    console.log('connected')
  } catch (err) {
    console.log(err)
  }
  app.listen(3000, () => {
    console.log('app is listening on port 3000')
  })
}
start()
