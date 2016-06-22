var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
	username: {type: String, lowercase: true, unique: true},
	email: {type: String, lowercase: true, unique: true},
    bio: String,
    image: String,
	favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
	following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],	
	hash: String,
	salt: String
}, {timestamps: true});

mongoose.model('User', UserSchema);
