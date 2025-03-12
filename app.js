const express = require('express');
const path = require('path');
const { rateLimit } = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const { xss } = require('express-xss-sanitizer');
const hpp = require('hpp');
const cors = require('cors');
const compression = require('compression');
const ErrorObject = require('./Errors/ErrorObject');
const articlesRouter = require('./routes/articleRoutes');
const usersRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const globalErrors = require('./Errors/errorHandlers');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 5 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);

app.use(
  helmet({
    crossOriginResourcePolicy: false,
    referrerPolicy: false,
  })
);

app.use(cors());

app.use(express.json({ limit: '100kb' }));

app.use(mongoSanitize());

app.use(xss());

app.use(hpp());

app.use(compression());

app.use('/api/v1/articles', articlesRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/reviews', reviewRouter);

app.all('*', (req, res, next) => {
  next(new ErrorObject(`404. Can't find this page ${req.originalUrl}`, 404));
});
app.use(globalErrors);

module.exports = app;
