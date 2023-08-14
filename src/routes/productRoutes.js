const express = require('express')
const Product = require('../models/product')
const catchAsync = require('../util/catchAsync')

const router = express.Router()

router.get(
  '/api/v1/stoc/orders/products',
  catchAsync(async (req, res, next) => {
    const products = await Product.find()

    res.status(200).json({
      results: products.length,
      products,
    })
  })
)

module.exports = router
