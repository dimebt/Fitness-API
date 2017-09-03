var mongoose = require('mongoose');

// Genre Schema
var gallerySchema = mongoose.Schema({	
	gallery: {
		date: {
		type: String,
		required: true
	},
	date: {
		type: String,
		required: true
	},
	date: {
		type: String,
		required: true
	},
	date: {
		type: String,
		required: true
	},
	date: {
		type: String,
		required: true
	},
	track: {
		type: String,
		required: true
	}
	}
	
}, 
	{ collection: 'gallery' }
);

// to access Book outside 
var Gallery = module.exports = mongoose.model('Gallery', gallerySchema);

// Get Books
module.exports.getGallery = function(callback, limit) {
	Gallery.find(callback).limit(limit);
};
