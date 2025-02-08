const mongoose = require('mongoose');
const Article = require('./articleModel');

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

reviewSchema.index({ aboutArticle: 1, author: 1 }, { unique: true });

reviewSchema.statics.getAverageRating = async function (articleId) {
  const stats = await this.aggregate([
    {
      $match: { aboutArticle: articleId },
    },
    {
      $group: {
        _id: '$aboutArticle',
        nRatings: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  if (stats.length) {
    await Article.findByIdAndUpdate(articleId, {
      ratingsVotes: stats[0].nRatings,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Article.findByIdAndUpdate(articleId, {
      ratingsVotes: 0,
      ratingsAverage: 0,
    });
  }
};

reviewSchema.post('save', function () {
  this.constructor.getAverageRating(this.aboutArticle);
});

reviewSchema.post(/^findOneAnd/, async function (doc) {
  await Review.getAverageRating(doc.aboutArticle);
});

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'author',
    select: 'name photo',
  });

  next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
