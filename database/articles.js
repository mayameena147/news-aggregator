const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    url: { type: String, required: true },
    publishedAt: { type: Date },
    source: { type: String },
    category: { type: String }
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;