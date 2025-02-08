const ErrorObject = require('../Errors/ErrorObject');
const Article = require('./../models/articleModel');
const factory = require('./controllerFactory');
const {
  filterObjectByKeys,
  filterForMongoQuery,
} = require('./../utils/helpers');

exports.getAllArticles = (req, res, next) =>
  factory.getAll(Article, req, res, next);
// exports.getAllArticles = async (req, res, next) => {
//   try {
//     const requestQuery = filterObjectByKeys(
//       req.query,
//       Object.keys(Article.schema.tree)
//     );

//     const searchQuery = filterForMongoQuery(requestQuery);

//     const articles = await Article.find(searchQuery);

//     res.status(200).json({
//       status: 'success',
//       results: articles.length,
//       data: {
//         articles,
//       },
//     });
//   } catch (err) {
//     const message = err.message || 'No article found.';
//     next(new ErrorObject(message, 404));
//   }
// };

exports.getArticle = (req, res, next) =>
  factory.getOne(Article, req, res, next);
// exports.getArticle = async (req, res, next) => {
//   try {
//     const article = await Article.findOne({ _id: req.params.id });
//     if (!article) {
//       return next(new ErrorObject('No article found.', 404));
//     }

//     res.status(200).json({
//       status: 'success',
//       data: {
//         article,
//       },
//     });
//   } catch (err) {
//     const message = err.message || 'No article found.';
//     next(new ErrorObject(message, 404));
//   }
// };

exports.createArticle = (req, res, next) =>
  factory.createOne(Article, req, res, next);
// exports.createArticle = async (req, res, next) => {
//   try {
//     const newArticle = await Article.create(req.body);
//     res.status(201).json({
//       status: 'success',
//       data: {
//         article: newArticle,
//       },
//     });
//   } catch (err) {
//     const message = err.message || 'No article found.';
//     next(new ErrorObject(message, 404));
//   }
// };

exports.updateArticle = (req, res, next) =>
  factory.updateOne(Article, req, res, next);
// exports.updateArticle = async (req, res, next) => {
//   try {
//     const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     res.status(200).json({
//       status: 'success',
//       data: {
//         article,
//       },
//     });
//   } catch (err) {
//     const message = err.message || 'No article found.';
//     next(new ErrorObject(message, 404));
//   }
// };

exports.deleteArticle = (req, res, next) =>
  factory.deleteOne(Article, req, res, next);
// exports.deleteArticle = async (req, res, next) => {
//   try {
//     await Article.findByIdAndDelete(req.params.id);
//     res.status(204).json({
//       status: 'success',
//       data: null,
//     });
//   } catch (err) {
//     const message = err.message || 'No article found.';
//     next(new ErrorObject(message, 404));
//   }
// };
