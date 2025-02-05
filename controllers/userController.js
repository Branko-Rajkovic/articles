const ErrorObject = require('../Errors/ErrorObject');
const User = require('./../models/userModel');

const getUpdatedFields = (userInput, ...fields) => {
  const updates = {};
  Object.keys(userInput).forEach((element) => {
    if (fields.includes(element)) updates[element] = userInput[element];
  });
  return updates;
};

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

exports.updateMe = async (req, res, next) => {
  //Updating data other than password
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new ErrorObject('This route is not for password updates.', 400)
    );
  }
  const updates = getUpdatedFields(req.body, 'name', 'email');
  const user = await User.findByIdAndUpdate(req.user.id, updates, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'succes',
    data: {
      user,
    },
  });
};

exports.deleteMe = async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'succes',
    data: null,
  });
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
