var jwt = require('express-jwt');
var passport = require('passport');
var mongoose = require('mongoose');
var _ = require('underscore');
var Article = mongoose.model('Article');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');
var passport = require('passport');


module.exports = function(app) {
	//	our middleware to check if user is logged in or not by passed jwt token.
	var auth = jwt({
		secret: 'conduit', 
		userProperty: 'payload',
		getToken: function fromHeaderOrQuerystring (req) {
			if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
				return req.headers.authorization.split(' ')[1];
			}else if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') {
				return req.headers.authorization.split(' ')[1];
			} else if (req.query && req.query.token) {
				return req.query.token;
			}
			return null;
		}
	});
	
	// Preload article objects on routes with ':article'
	app.param('article', function(req, res, next, slug) {
		Article.findOne({ slug: slug}, function (err, article) {
			if (err) { return next(err); }
			if (!article) { return next(new Error("can't find article")); }
			req.article = article;
			return next();
		});
	});
	
	app.param('username', function(req, res, next, username) {
		User.findOne({ username: username}, function (err, user) {
			if (err) { return next(err); }
			if (!user) { return next(new Error("can't find user")); }
			req.user = user;
			return next();
		});
	});
	
	app.param('comment', function(req, res, next, id) {
		var query = Comment.findById(id);
		
		query.exec(function (err, comment){
			if (err) { return next(err); }
			if (!comment) { return next(new Error("can't find comment")); }
			
			req.comment = comment;
			return next();
		});
	});
		
};