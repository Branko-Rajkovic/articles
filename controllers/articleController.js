const Article = require('./../models/articleModel');
const factory = require('./controllerFactory');
const multer = require('multer');
const sharp = require('sharp');
const uuid = require('uuid');

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

exports.uploadArticleImages = upload.array('images', 10);

exports.resizeArticleImages = async (req, res, next) => {
  if (!req.files) return next();

  req.body.images = [];

  await Promise.all(
    req.files.map(async (file, index) => {
      const filename = `article-image-${index + 1}---${uuid.v4()}.png`;

      await sharp(file.buffer)
        .resize(400)
        .toFormat('png')
        .png({ quality: 90 })
        .toFile(`/images/articles/${filename}`);

      req.body.images.push(filename);
    })
  );

  next();
};

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
