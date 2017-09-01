var mongoose = require('mongoose');

// Genre Schema
var nowplayingSchema = mongoose.Schema({	
	date: {
		type: Date,
		required: true
	},
	track: {
		type: String,
		required: true
	}
}, 
	{ collection: 'nowplaying' }
);

// to access Book outside 
var Nowplaying = module.exports = mongoose.model('Nowplaying', nowplayingSchema);

// Get Books
module.exports.getNowplaying = function(callback, limit) {
	Nowplaying.find(callback).limit(limit);
};
