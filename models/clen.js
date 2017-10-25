var mongoose = require('mongoose');

// Genre Schema
var clenSchema = mongoose.Schema({
	clenid: {
		type: Number,
		required: true
	},
	ime: {
		type: String,
		required: true
	},
	prezime: {
		type: String,
		required: true
	},
	prekar: {
		type: String,
		default: true
	},
	adresa: {
		type: String,
		default: true
	},
	mesto: {
		type: String,
		default: true
	},
	pol: {
		type: String,
		default: true
	},
	embg: {
		type: String,
		default: true
	},
	brlicnakarta: {
		type: String,
		default: true
	},
	slika: {
		type: String,
		default: true
	},
	tel: {
		type: String,
		default: true
	}	
}, 
	{ collection: 'tbl_clenovi' }
);

// to access Clen outside 
var Clen = module.exports = mongoose.model('tbl_clenovi', clenSchema);
