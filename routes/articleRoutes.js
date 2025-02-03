const express = require('express');

const {
  getAllArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
} = require('../controllers/articleController');
const { protect } = require('../controllers/authControler');

const router = express.Router();

router.route('/').get(protect, getAllArticles).post(createArticle);
router.route('/:id').get(getArticle).patch(updateArticle).delete(deleteArticle);

module.exports = router;
