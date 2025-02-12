const express = require('express');

const {
  getAllReviews,
  getReview,
  createReview,
  deleteReview,
  updateReview,
} = require('../controllers/reviewController');
const { protect, restrictTo } = require('../controllers/authControler');

const router = express.Router({ mergeParams: true });

router.route('/').get(getAllReviews).post(protect, createReview);
router
  .route('/:id')
  .get(getReview)
  .patch(protect, updateReview)
  .delete(protect, deleteReview);

module.exports = router;
