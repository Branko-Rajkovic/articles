const ErrorObject = require('../Errors/ErrorObject');
const Review = require('./../models/reviewModel');
const factory = require('./controllerFactory');

exports.getAllReviews = (req, res, next) =>
  factory.getAll(Review, req, res, next);
// exports.getAllReviews = async (req, res, next) => {
//   try {
//     console.log('in all reviews', req.params);
//     const filter = req.params.articleId
//       ? { aboutArticle: req.params.articleId }
//       : {};

//     const reviews = await Review.find(filter);

//     res.status(200).json({
//       status: 'success',
//       results: reviews.length,
//       data: {
//         reviews,
//       },
//     });
//   } catch (err) {
//     const message = err.message || 'No review found.';
//     next(new ErrorObject(message, 404));
//   }
// };

exports.getReview = (req, res, next) => factory.getOne(Review, req, res, next);
// exports.getReview = async (req, res, next) => {
//   try {
//     const review = await Review.findById(req.params.id);

//     if (!review) {
//       return next(new ErrorObject('No review found.', 404));
//     }

//     res.status(200).json({
//       status: 'success',
//       data: {
//         review,
//       },
//     });
//   } catch (err) {
//     const message = err.message || 'No review found.';
//     next(new ErrorObject(message, 404));
//   }
// };

exports.createReview = (req, res, next) =>
  factory.createOne(Review, req, res, next);
// exports.createReview = async (req, res, next) => {
//   try {
//     console.log('in createReview', req.user);
//     //nested routes
//     if (!req.body.aboutArticle) req.body.aboutArticle = req.params.articleId;
//     if (!req.body.author) req.body.author = req.user._id;

//     const newReview = await Review.create(req.body);
//     res.status(201).json({
//       status: 'success',
//       data: {
//         review: newReview,
//       },
//     });
//   } catch (err) {
//     const message = err.message || 'Something went wrong.';
//     next(new ErrorObject(message, 404));
//   }
// };

exports.deleteReview = (req, res, next) =>
  factory.deleteOne(Review, req, res, next);
// exports.deleteReview = async (req, res, next) => {
//   try {
//     await Review.findByIdAndDelete(req.params.id);
//     res.status(204).json({
//       status: 'success',
//       data: null,
//     });
//   } catch (err) {
//     const message = err.message || 'No review found.';
//     next(new ErrorObject(message, 404));
//   }
// };
