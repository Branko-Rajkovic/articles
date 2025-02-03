const ErrorObject = require('../Errors/ErrorObject');
const User = require('./../models/userModel');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: 'succes',
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    const message = err.message || 'Not found';
    next(new ErrorObject(message, 400));
  }
};

exports.createUser = async (req, res, next) => {
  try {
    res.status(200).json({
      status: 'succes',
      message: 'not implemented',
    });
  } catch (err) {
    const message = err.message || 'Not found';
    next(new ErrorObject(message, 400));
  }
};

exports.getUser = async (req, res, next) => {
  try {
    res.status(200).json({
      status: 'succes',
      message: 'not implemented',
    });
  } catch (err) {
    const message = err.message || 'Not found';
    next(new ErrorObject(message, 400));
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    res.status(200).json({
      status: 'succes',
      message: 'not implemented',
    });
  } catch (err) {
    const message = err.message || 'Not found';
    next(new ErrorObject(message, 400));
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    res.status(200).json({
      status: 'succes',
      message: 'not implemented',
    });
  } catch (err) {
    const message = err.message || 'Not found';
    next(new ErrorObject(message, 400));
  }
};
