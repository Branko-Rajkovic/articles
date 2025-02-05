const express = require('express');
const { rateLimit } = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const { xss } = require('express-xss-sanitizer');
const hpp = require('hpp');
const ErrorObject = require('./Errors/ErrorObject');
const articlesRouter = require('./routes/articleRoutes');
const usersRouter = require('./routes/userRoutes');
const globalErrors = require('./Errors/errorHandlers');

const app = express();

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 5 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);

app.use(helmet());

app.use(express.json({ limit: '10kb' }));

app.use(mongoSanitize());

app.use(xss());

app.use(hpp());

app.use('/api/v1/articles', articlesRouter);
app.use('/api/v1/users', usersRouter);
app.all('*', (req, res, next) => {
  next(new ErrorObject(`404. Can't find this page ${req.originalUrl}`, 404));
});
app.use(globalErrors);

module.exports = app;
