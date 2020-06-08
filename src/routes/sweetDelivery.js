const express = require('express');
const router = express.Router();

const {
  createSweetDelivery,
  getAllOpenDeliveries,
  assignDelivery,
  completeDelivery,
  completedDeliveries,
  openByUser,
} = require('../controllers/deliveryCtrl');

// @route   POST /create
// @desc    creates new delivery
// @access  admin only
router.post('/create', createSweetDelivery);

// @route   GET /open
// @desc    get all open deliveries
// @access  public
router.get('/open', getAllOpenDeliveries);

// @route   GET /open/user/:id
// @desc    get open Deliveries by user id
// @access  public
router.get('/open/user/:id', openByUser);

// @route   POST /assign/:id
// @desc    assign delivery to user
// @access  admin only
router.post('/assign/:id', assignDelivery);

// @route   POST /complete/:id
// @desc    complete delivery
// @access  admin only
router.post('/complete/:id', completeDelivery);

// @route   GET /completed
// @desc    get completed Deliveries
// @access  admin only
router.get('/completed', completedDeliveries);

module.exports = router;
