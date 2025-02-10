const ErrorObject = require('../Errors/ErrorObject');
const User = require('./../models/userModel');
const factory = require('./controllerFactory');
const multer = require('multer');
const sharp = require('sharp');
const uuid = require('uuid');

exports.getAllUsers = (req, res, next) => factory.getAll(User, req, res, next);

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'assets/images/users');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `user---${uuid.v4()}.${ext}`);
//   },
// });

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new ErrorObject('Not an image. Please upload image.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = async (req, res, next) => {
  console.log(req.file);
  if (!req.file) return next();

  req.file.filename = `user---${uuid.v4()}.png`;

  await sharp(req.file.buffer)
    .resize(200, 200)
    .toFormat('png')
    .png({ quality: 90 })
    .toFile(`assets/images/users/${req.file.filename}`);

  next();
};

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
