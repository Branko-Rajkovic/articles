const Review = require('./../models/reviewModel');
const factory = require('./controllerFactory');

exports.getAllReviews = (req, res, next) =>
  factory.getAll(Review, req, res, next);

exports.getReview = (req, res, next) => factory.getOne(Review, req, res, next);

exports.createReview = (req, res, next) =>
  factory.createOne(Review, req, res, next);

exports.updateReview = (req, res, next) =>
  factory.updateOne(Review, req, res, next);

exports.deleteReview = (req, res, next) =>
  factory.deleteOne(Review, req, res, next);
