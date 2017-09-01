var mongoose = require('mongoose');


var pricelistSchema = mongoose.Schema({
	clenarina: {
		type: String,
		required: true
	},
	iznos: {
		type: String,
		required: true
	},
	denovi: {
		type: String,
		required: true
	}
}, 
	{ collection: 'pricelist' }

);

// to access Book outside 
var Pricelist = module.exports = mongoose.model('Pricelist', pricelistSchema);

// Get Books
module.exports.getPricelist = function(callback, limit) {
	Pricelist.find(callback).limit(limit);
};
