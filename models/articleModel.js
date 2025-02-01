const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'An article must have a title'],
  },
  summary: { type: String },
  contentTopics: { type: [String] },
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

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
