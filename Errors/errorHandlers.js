module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (err.isOperational) {
    if (process.env.NODE_ENV === 'development') {
      //development
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: err.stack,
        err: err,
      });
    } else {
      //production
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
  } else {
    //unknown errors
    console.error('ERROR >>> ', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }
};
