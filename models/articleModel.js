const mongoose = require('mongoose');
const slugify = require('slugify');

const articleSchema = new mongoose.Schema({
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
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: [Date],
    default: [],
  },
  ratingsAverage: { type: Number, default: 0 },
  ratingsVotes: { type: Number, default: 0 },
});

articleSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
