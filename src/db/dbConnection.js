const mongoose = require('mongoose');

// eslint-disable-next-line
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`;

const options = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose
  .connect(url, options)
  .then((db) => console.log(`Server: connected to :  ${db.connection.name}`))
  .catch((err) => console.error('Server: connection error: ', err));

// eslint-disable-next-line
const connection = mongoose.connection;
