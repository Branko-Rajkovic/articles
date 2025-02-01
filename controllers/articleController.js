const Article = require('./../models/articleModel');
const {
  filterObjectByKeys,
  filterForMongoQuery,
} = require('./../utils/helpers');

exports.getAllArticles = async (req, res) => {
  try {
    console.log(req.query);
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
    res.status(400).json({
      status: 'failed',
      message: 'invalid data sent',
    });
  }
};

exports.getArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        article,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: 'invalid data sent',
    });
  }
};

exports.createArticle = async (req, res) => {
  try {
    const newArticle = await Article.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        article: newArticle,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: 'invalid data sent',
    });
  }
};

exports.updateArticle = async (req, res) => {
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
    res.status(400).json({
      status: 'failed',
      message: 'invalid data sent',
    });
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: 'invalid data sent',
    });
  }
};
