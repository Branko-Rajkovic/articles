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

router
  .route('/')
  .get(getAllReviews)
  .post(protect, restrictTo('user', 'admin', 'superadmin'), createReview);
router
  .route('/:id')
  .get(getReview)
  .patch(updateReview)
  .delete(protect, restrictTo('user', 'admin', 'superadmin'), deleteReview);

module.exports = router;
