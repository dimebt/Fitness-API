var mongoose = require('mongoose');

// Genre Schema
var newsSchema = mongoose.Schema({
	date: {
		type: Date,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	create_date: {
		type: Date,
		default: Date.now
	}
});

// to access Book outside 
var News = module.exports = mongoose.model('News', newsSchema);

// Get Books
module.exports.getNews = function(callback, limit) {
	News.find(callback).limit(limit);
};
