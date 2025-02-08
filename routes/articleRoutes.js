const express = require('express');

const {
  getAllArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
} = require('../controllers/articleController');
const { protect, restrictTo } = require('../controllers/authControler');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

router.use('/:articleId/reviews', reviewRouter);

router.route('/').get(getAllArticles).post(createArticle);
router
  .route('/:id')
  .get(getArticle)
  .patch(updateArticle)
  .delete(protect, restrictTo('admin', 'superadmin'), deleteArticle);

module.exports = router;
