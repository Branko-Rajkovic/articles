const User = require('./../models/userModel');
const factory = require('./controllerFactory');

exports.getAllUsers = (req, res, next) => factory.getAll(User, req, res, next);
// exports.getAllUsers = async (req, res, next) => {
//   try {
//     const users = await User.find();
//     res.status(200).json({
//       status: 'succes',
//       results: users.length,
//       data: {
//         users,
//       },
//     });
//   } catch (err) {
//     const message = err.message || 'Not found';
//     next(new ErrorObject(message, 400));
//   }
// };

exports.updateMe = (req, res, next) => factory.updateOne(User, req, res, next);
// exports.updateMe = async (req, res, next) => {
//   //Updating data other than password
//   if (req.body.password || req.body.passwordConfirm) {
//     return next(
//       new ErrorObject('This route is not for password updates.', 400)
//     );
//   }
//   const updates = getUpdatedFields(req.body, 'name', 'email');
//   const user = await User.findByIdAndUpdate(req.user.id, updates, {
//     new: true,
//     runValidators: true,
//   });

//   res.status(200).json({
//     status: 'succes',
//     data: {
//       user,
//     },
//   });
// };

exports.deleteMe = (req, res, next) =>
  factory.deactivateOne(User, req, res, next);
// exports.deleteMe = async (req, res, next) => {
//   await User.findByIdAndUpdate(req.user.id, { active: false });
//   res.status(204).json({
//     status: 'succes',
//     data: null,
//   });
// };

exports.getUser = (req, res, next) => factory.getOne(User, req, res, next);
// exports.getUser = async (req, res, next) => {
//   try {
//     res.status(200).json({
//       status: 'succes',
//       message: 'not implemented',
//     });
//   } catch (err) {
//     const message = err.message || 'Not found';
//     next(new ErrorObject(message, 400));
//   }
// };
exports.updateUser = (req, res, next) =>
  factory.updateOne(User, req, res, next);
// exports.updateUser = async (req, res, next) => {
//   try {
//     res.status(200).json({
//       status: 'succes',
//       message: 'not implemented',
//     });
//   } catch (err) {
//     const message = err.message || 'Not found';
//     next(new ErrorObject(message, 400));
//   }
// };

exports.deleteUser = (req, res, next) =>
  factory.deleteOne(User, req, res, next);
// exports.deleteUser = async (req, res, next) => {
//   try {
//     res.status(200).json({
//       status: 'succes',
//       message: 'not implemented',
//     });
//   } catch (err) {
//     const message = err.message || 'Not found';
//     next(new ErrorObject(message, 400));
//   }
// };

exports.createUser = (req, res, next) =>
  factory.createOne(User, req, res, next);
