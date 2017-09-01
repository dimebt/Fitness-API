var mongoose = require('mongoose');

// Genre Schema
var promotionsSchema = mongoose.Schema({
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
	line1: {
		type: String,
		required: true
	},
	line2: {
		type: String,
		required: true
	},
	line3: {
		type: String,
		required: true
	},
	create_date: {
		type: Date,
		default: Date.now
	}
});

// to access Book outside 
var Promotions = module.exports = mongoose.model('Promotions', promotionsSchema);

// Get Books
module.exports.getPromotions = function(callback, limit) {
	Promotions.find(callback).limit(limit);
};
