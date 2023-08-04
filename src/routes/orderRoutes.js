const express = require('express')
const getAllOrders = require('../controller/getAllOrders')
const getOrderById = require('../controller/getOrderById')
const getOrdersForCurrentUser = require('../controller/getOrdersForCurrentUser')
const postOrder = require('../controller/postOrder')
const validateUser = require('../middleware/isUserAuth')

const router = express.Router()

router.route('/api/v1/orders').get(getAllOrders).post(validateUser, postOrder)

router.route('/api/v1/orders/:id').get(getOrderById)

router
  .route('/api/v1/orders/user/current')
  .get(validateUser, getOrdersForCurrentUser)

module.exports = router
