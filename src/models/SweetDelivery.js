const { Schema, model } = require('mongoose');

const schema = {
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  address: {
    type: String,
    require: true,
  },
  receiverName: {
    type: String,
    require: true,
  },
  info: {
    type: String,
    require: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  receiverType: {
    type: String,
    enum: ['soldier', 'lonely elder', 'holocaust survivor', 'other'],
    default: 'other',
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  dateCompleted: {
    type: Date,
  },
  coordinates: {
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
  },
};

const sweetDelivery_schema = new Schema(schema, {
  collection: 'sweetDelivery',
});

const SweetDelivery = new model('sweetDelivery', sweetDelivery_schema);

module.exports = SweetDelivery;
