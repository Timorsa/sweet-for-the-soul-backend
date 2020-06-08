const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
  async signUp(req, res, next) {
    const { name, email, password, phone, address, isAdmin } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }
      user = new User({
        name,
        email,
        password,
        phone,
        address,
        isAdmin,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      const payload = {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          isAdmin: user.isAdmin,
        },
      };

      jwt.sign(
        payload,
        // eslint-disable-next-line no-undef
        process.env.SECRET_KEY,
        { expiresIn: 36000000 },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({ token });
        }
      );
    } catch (err) {
      next({
        status: 500,
        message: 'Server Error',
      });
    }
  },

  async signIn(req, res, next) {
    try {
      const { email, password } = req.body;
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          isAdmin: user.isAdmin,
        },
      };

      jwt.sign(
        payload,
        // eslint-disable-next-line no-undef
        process.env.SECRET_KEY,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({ token });
        }
      );
    } catch (err) {
      next({
        status: 500,
        message: 'no such user',
      });
    }
  },
  async incDeliveryNum(req, res, next) {
    try {
      const id = req.params.id;
      let user = await User.findByIdAndUpdate(id, {
        $inc: { numOfDeliveries: 1 },
      });
      user.numOfDeliveries++;
      res.status(200).json(user);
    } catch (err) {
      next({
        status: 500,
        message: 'failed to increment number of deliveries',
      });
    }
  },
};
