const express = require('express');
const logger = require('morgan');
const debug = require('debug')('app');
const helmet = require('helmet');
const chalk = require('chalk');
const mongoose = require('mongoose');

const userRouter = require('./routes/users.routes');
const { PORT, MONGODB_URI } = require('./config');

mongoose.connect(
  MONGODB_URI,
  { useNewUrlParser: true, useCreateIndex: true },
  (err, client) => {
    debug('Database server started');
  }
);

const app = express();

app.set('PORT', PORT || 3001);

app.use(helmet());
app.use(logger('dev'));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);

app.use('/users', userRouter);

app.listen(app.get('PORT'), () => {
  debug(
    `Webserver started on port ${chalk.inverse.bold.green(app.get('PORT'))}`
  );
});
