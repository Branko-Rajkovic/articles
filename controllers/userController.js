const User = require('./../models/userModel');
const factory = require('./controllerFactory');

exports.getAllUsers = (req, res, next) => factory.getAll(User, req, res, next);

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = (req, res, next) => factory.updateOne(User, req, res, next);

exports.deleteMe = (req, res, next) =>
  factory.deactivateOne(User, req, res, next);

exports.getUser = (req, res, next) => factory.getOne(User, req, res, next);

exports.updateUser = (req, res, next) =>
  factory.updateOne(User, req, res, next);

exports.deleteUser = (req, res, next) =>
  factory.deleteOne(User, req, res, next);

exports.createUser = (req, res, next) =>
  factory.createOne(User, req, res, next);
