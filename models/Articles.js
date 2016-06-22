var mongoose = require('mongoose');
var slug = require('slug')
require('../models/Users');
var User = mongoose.model('User');

var ArticleSchema = new mongoose.Schema({
	slug: {type: String, lowercase: true, unique: true},
	title: String,
	description: String,
	body: String,
	favoritesCount: {type: Number, default: 0},
	comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    tagList: [{ type: String }],
	author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {timestamps: true});


mongoose.model('Article', ArticleSchema);