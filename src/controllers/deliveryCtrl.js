const SweetDelivery = require('../models/SweetDelivery');

module.exports = {
  async createSweetDelivery(req, res, next) {
    try {
      const {
        address,
        receiverName,
        info,
        receiverType,
        coordinates,
      } = req.body;

      const sweetDelivery = new SweetDelivery({
        address,
        receiverName,
        info,
        receiverType,
        coordinates,
      });

      await sweetDelivery.save();

      res.status(200).json(sweetDelivery);
    } catch (err) {
      next({
        status: 500,
        message: 'failed to create delivery',
      });
    }
  },

  async getAllOpenDeliveries(req, res, next) {
    try {
      const openDeliveries = await SweetDelivery.find({ completed: false });
      res.status(200).json(openDeliveries);
    } catch (err) {
      next({
        status: 500,
        message: 'Oops something went wrong',
      });
    }
  },

  async assignDelivery(req, res, next) {
    try {
      const sweetDelivery = await SweetDelivery.findById(req.params.id);
      sweetDelivery.userId = req.body.userId;
      await sweetDelivery.save();
      res.status(200).json(sweetDelivery);
    } catch (err) {
      next({
        status: 500,
        message: 'failed to assigned delivery',
      });
    }
  },

  async completeDelivery(req, res, next) {
    try {
      const sweetDelivery = await SweetDelivery.findById(req.params.id);
      sweetDelivery.completed = true;
      await sweetDelivery.save();
      res.status(200).json(sweetDelivery);
    } catch (err) {
      next({
        status: 500,
        message: 'Failed to update delivery status',
      });
    }
  },

  async completedDeliveries(req, res, next) {
    try {
      const completedDeliveries = await SweetDelivery.find({ completed: true });
      res.status(200).json(completedDeliveries);
    } catch (err) {
      next({
        status: 500,
        message: 'failed retrieved deliveries',
      });
    }
  },

  async openByUser(req, res, next) {
    try {
      const userDeliveries = await SweetDelivery.find({
        userId: req.params.id,
      });

      const uncompleted = userDeliveries.filter(
        (delivery) => delivery.completed === false
      );
      res.status(200).json(uncompleted);
    } catch (err) {
      next({
        status: 500,
        message: 'failed to get deliveries',
      });
    }
  },
};
