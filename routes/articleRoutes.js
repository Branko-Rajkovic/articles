const express = require('express');

const {
  getAllArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
} = require('../controllers/articleController');

const router = express.Router();

router.route('/').get(getAllArticles).post(createArticle);
router.route('/:id').get(getArticle).patch(updateArticle).delete(deleteArticle);

module.exports = router;
