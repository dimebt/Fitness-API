var mongoose = require('mongoose');

// Genre Schema
var memberSchema = mongoose.Schema({
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
	},
	email: {
		type: String,
		default: true
	},
	password: {
		type: String,
		default: true
	}
}, 
	{ collection: 'members' }
);

// to access Member outside 
var Member = module.exports = mongoose.model('members', memberSchema);

// Add Member
module.exports.addMember = function(member, callback) {
	Member.create(member, callback);
};