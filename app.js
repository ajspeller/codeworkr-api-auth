const express = require('express');
const logger = require('morgan');
const debug = require('debug')('app');
const helmet = require('helmet');
const chalk = require('chalk');

const userRouter = require('./routes/users.routes');

const app = express();

app.set('PORT', process.env.PORT || 3001);

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
