const ErrorObject = require('../Errors/ErrorObject');
const Article = require('./../models/articleModel');
const {
  filterObjectByKeys,
  filterForMongoQuery,
} = require('./../utils/helpers');

exports.getAllArticles = async (req, res, next) => {
  try {
    const requestQuery = filterObjectByKeys(
      req.query,
      Object.keys(Article.schema.tree)
    );

    const searchQuery = filterForMongoQuery(requestQuery);

    const articles = await Article.find(searchQuery);

    res.status(200).json({
      status: 'success',
      results: articles.length,
      data: {
        articles,
      },
    });
  } catch (err) {
    const message = err.message || 'No article found.';
    next(new ErrorObject(message, 404));
  }
};

exports.getArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        article,
      },
    });
  } catch (err) {
    const message = err.message || 'No article found.';
    next(new ErrorObject(message, 404));
  }
};

exports.createArticle = async (req, res, next) => {
  try {
    const newArticle = await Article.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        article: newArticle,
      },
    });
  } catch (err) {
    const message = err.message || 'No article found.';
    next(new ErrorObject(message, 404));
  }
};

exports.updateArticle = async (req, res, next) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        article,
      },
    });
  } catch (err) {
    const message = err.message || 'No article found.';
    next(new ErrorObject(message, 404));
  }
};

exports.deleteArticle = async (req, res, next) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    const message = err.message || 'No article found.';
    next(new ErrorObject(message, 404));
  }
};
