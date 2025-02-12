const { promisify } = require('util');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const ErrorObject = require('./../Errors/ErrorObject');
const Email = require('../email/email');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000,
  });
};

const createAndSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  //cookie secure option, only in production is set to true
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    secure: true,
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'development') cookieOptions.secure = false;

  res.cookie('jwt', token, cookieOptions);
  res.status(statusCode).json({
    status: 'succes',
    token,
    data: {
      user,
    },
  });
};

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    const url = `${req.protocol}://${req.get('host')}/me`;

    await new Email(newUser, url).sendWelcome();

    createAndSendToken(newUser, 201, res);
  } catch (err) {
    const message = err.message || 'No users found.';
    next(new ErrorObject(message, 404));
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorObject('Please provide email and password', 400));
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new ErrorObject('Incorrect email or password.', 400));
    }
    createAndSendToken(user, 200, res);
  } catch (err) {
    const message = err.message || 'No user found.';
    next(new ErrorObject(message, 404));
  }
};

exports.protect = async (req, res, next) => {
  try {
    const token =
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
        ? req.headers.authorization.split(' ')[1]
        : undefined;
    if (!token) return next(new ErrorObject('Not logged in.', 401));

    const checkToken = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET
    );
    const user = await User.findById(checkToken.id);
    //check if user is deleted after the token is created
    if (!user) return next(new ErrorObject('User does not exist.', 401));

    //check if user change password after token is created
    if (user.updatedAccount(checkToken.iat))
      return next(
        new ErrorObject('Password changed. Please log in again.', 401)
      );
    req.user = user;

    next();
  } catch (err) {
    const message = err.message || 'Please log in.';
    next(new ErrorObject(message, 401));
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) {
      return next();
    }
    return next(new ErrorObject('Not authorized.', 403));
  };
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(new ErrorObject('User does not exist.', 404));

    const resetToken = user.createResetToken();
    await user.save({ validateBeforeSave: false });

    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/users/reset-password/${resetToken}`;

    // const message = `Forgot password? Submit your new password in next 10 minutes. Reset your password here ${resetURL}`;

    // await sendEmail({
    //   email: user.email,
    //   subject: 'Your password reset token (valid 10 min)',
    //   message,
    // });

    await new Email(user, resetURL).sendPasswordReset();
    res.status(200).json({
      status: 'succes',
      message: 'Token sent to email',
    });
  } catch (err) {
    const message = err.message || 'Error sending email.';
    return next(new ErrorObject(message, 404));
  }
};

exports.resetPasword = async (req, res, next) => {
  try {
    //find user based on token
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpire: { $gt: Date.now() },
    });

    //update password
    if (!user)
      return next(new ErrorObject('Token is invalid or expired.', 400));

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpire = undefined;

    await user.save();

    createAndSendToken(user, 200, res);
  } catch (err) {
    const message = err.message || 'Error with updating password.';
    return next(new ErrorObject(message, 500));
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('+password');

    if (!(await user.correctPassword(req.body.oldPassword, user.password)))
      return next(new ErrorObject('Current password is wrong.', 401));

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();

    createAndSendToken(user, 200, res);
  } catch (err) {
    const message = err.message || 'Error with updating password.';
    return next(new ErrorObject(message, 500));
  }
};
