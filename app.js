const express = require('express');
const ErrorObject = require('./Errors/ErrorObject');
const articlesRouter = require('./routes/articleRoutes');
const usersRouter = require('./routes/userRoutes');
const globalErrors = require('./Errors/errorHandlers');

const app = express();

app.use(express.json());

app.use('/api/v1/articles', articlesRouter);
app.use('/api/v1/users', usersRouter);
app.all('*', (req, res, next) => {
  next(new ErrorObject(`404. Can't find this page ${req.originalUrl}`, 404));
});
app.use(globalErrors);

module.exports = app;
