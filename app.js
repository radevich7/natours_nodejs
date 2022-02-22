const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//1.MIDDLEWARE

// to use middleware, get data from request body
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
// 3rd party middleware to see the log of the request

app.use(express.static(`${__dirname}/public`));
// defying a new middleware,should be defined before other ones
app.use((req, res, next) => {
  console.log('Hello from the middleware 🔥');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
