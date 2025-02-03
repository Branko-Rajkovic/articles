const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const ErrorObject = require('./../Errors/ErrorObject');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    const token = signToken(newUser._id);

    res.status(201).json({
      status: 'succes',
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    const message = err.message || 'No users found.';
    next(new ErrorObject(message, 404));
  }
};

exports.login = async (req, res, next) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    console.log(email);

    if (!email || !password) {
      return next(new ErrorObject('Please provide email and password', 400));
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new ErrorObject('Incorrect email or password.', 400));
    }

    const token = signToken(user._id);
    res.status(200).json({
      status: 'succes',
      token,
    });
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

    next();
  } catch (err) {
    const message = err.message || 'Please log in.';
    next(new ErrorObject(message, 401));
  }
};
