const Article = require('./../models/articleModel');
const factory = require('./controllerFactory');

exports.getAllArticles = (req, res, next) =>
  factory.getAll(Article, req, res, next);

exports.getArticle = (req, res, next) =>
  factory.getOne(Article, req, res, next);

exports.createArticle = (req, res, next) =>
  factory.createOne(Article, req, res, next);

exports.updateArticle = (req, res, next) =>
  factory.updateOne(Article, req, res, next);

exports.deleteArticle = (req, res, next) =>
  factory.deleteOne(Article, req, res, next);
