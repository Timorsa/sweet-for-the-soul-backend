require('dotenv').config();
const express = require('express');
const cors = require('cors');

// eslint-disable-next-line no-unused-vars
const db = require('./src/db/dbConnection');

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// User Router
const userRouter = require('./src/routes/user');
app.use('/user', userRouter);
// Delivery Router
const deliveryRouter = require('./src/routes/sweetDelivery');
app.use('/delivery', deliveryRouter);

// Error handling
app.use((req, res, next) => {
  let err = new Error('Not Found !!');
  err.status = 404;
  next(err);
});
const errorHandler = require('./src/handlers/error');
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server: running on port : ${PORT}`);
});
