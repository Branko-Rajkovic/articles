const express = require('express');

const {
  getAllArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
  uploadArticleImages,
  resizeArticleImages,
} = require('../controllers/articleController');
const { protect, restrictTo } = require('../controllers/authControler');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

router.use('/:articleId/reviews', reviewRouter);

router.route('/').get(getAllArticles).post(createArticle);
router
  .route('/:id')
  .get(getArticle)
  .patch(uploadArticleImages, resizeArticleImages, updateArticle)
  .delete(protect, restrictTo('admin', 'superadmin'), deleteArticle);

module.exports = router;
