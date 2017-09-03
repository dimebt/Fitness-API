var mongoose = require('mongoose');

// Genre Schema
var gallerySchema = mongoose.Schema({	
	title: {
		type: String,
		required: true
	},
	imgPath: {
		type: String,
		required: true
	},
	imgPathTumbnails: {
		type: String,
		required: true
	},
	dateTaken: {
		type: String,
		required: true
	},
	desription: {
		type: String,
		required: true
	},
	tags: {
		type: String,
		required: true
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
