const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    commentTitle: {
      type: String,
      trim: true,
      maxLength: [400, 'Title can have maximum 400 characters.'],
    },
    commentText: {
      type: String,
      trim: true,
      maxLength: [1500, 'Comment can have maximum 1500 characters'],
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Must have autor.'],
    },
    aboutArticle: {
      type: mongoose.Schema.ObjectId,
      ref: 'Article',
      required: [true, 'Must be about article.'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    rating: { type: Number, default: 0 },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'author',
    select: 'name photo',
  });

  next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
