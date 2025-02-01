const express = require('express');

const articlesRouter = require('./routes/articleRoutes');
const usersRouter = require('./routes/userRoutes');

const app = express();

app.use(express.json());

app.use('/api/v1/articles', articlesRouter);
app.use('/api/v1/users', usersRouter);

module.exports = app;
