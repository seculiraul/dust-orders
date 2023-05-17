const express = require('express')
const validateUser = require('../middleware/isUserAuth')
const User = require('../../../auth/src/medels/User')
const Order = require('../models/order')

const router = express.Router()

router
  .route('/api/v1/orders')
  .get(async (req, res, next) => {
    const orders = await Order.find()

    res.status(200).json({
      message: 'success',
      data: orders,
    })
  })
  .post(validateUser, async (req, res, next) => {
    const {
      total,
      transportCost,
      products,
      deliveryDetails,
      payMethod,
      deliveryOption,
    } = req.body

    console.log(req.currentUser)
    const order = await Order.create({
      total,
      transportCost,
      products,
      userId: req.currentUser ? req.currentUser.id : undefined,
      deliveryDetails,
      payMethod,
      deliveryOption,
    })

    res.status(201).json({
      message: 'success',
      data: {
        order,
      },
    })
  })

router.route('/api/v1/orders/:id').get(async (req, res, next) => {
  const order = await Order.findById(req.params.id)

  res.json({
    message: 'success',
    data: {
      order,
    },
  })
})

router
  .route('/api/v1/orders/user/current')
  .get(validateUser, async (req, res, next) => {
    if (!req.currentUser) {
      console.log('there is no user logged')
      return res.json({
        message: 'There is no user logged',
      })
    }
    const orders = await Order.find({ userId: req.currentUser.id })

    res.status(200).json({
      message: req.currentUser.id,
      data: {
        orders,
      },
    })
  })
module.exports = router
