const express = require('express');
const router = express.Router();

const { signUp, signIn, incDeliveryNum } = require('../controllers/userCtrl');

// @route   POST /login
// @desc    authenticates user
// @access  public
router.post('/signin', signIn);

// @route   POST /user
// @desc    creates user
// @access  public
router.post('/signup', signUp);

// @route   POST /user/deliveryCompleted
// @desc    increments number of completed deliveries
// @access  public
router.post('/incdeliveries/:id', incDeliveryNum);

module.exports = router;
