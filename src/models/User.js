const { Schema, model } = require('mongoose');

const schema = {
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  numOfDeliveries: {
    type: Number,
    default: 0,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
};

const user_schema = new Schema(schema, { collection: 'user' });
const User = model('user', user_schema);

module.exports = User;
