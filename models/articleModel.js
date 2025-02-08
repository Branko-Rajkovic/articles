const mongoose = require('mongoose');
const slugify = require('slugify');

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'An article must have a title'],
      trim: true,
      unique: true,
      maxLength: [400, 'Title can have maximum 400 characters.'],
    },
    slug: String,
    summary: { type: String, trim: true },
    contentTopics: {
      type: [String],
    },
    paragraphs: { type: [String] },
    lists: { type: [String] },
    images: { type: [String] },
    author: { type: mongoose.Schema.ObjectId, ref: 'User' },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
    ratingsAverage: { type: Number, default: 0 },
    ratingsVotes: { type: Number, default: 0 },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

articleSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

articleSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'aboutArticle',
});

articleSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'author',
    select: 'name',
  });
  next();
});

articleSchema.post('findOne', async function (doc) {
  await doc.populate({
    path: 'reviews',
    select: '_id',
  });

  return doc;
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
