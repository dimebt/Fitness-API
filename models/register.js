var mongoose = require('mongoose');

// Genre Schema
var registerSchema = mongoose.Schema({	
	ime: {
		type: String,
		required: true
	},
	prezime: {
		type: String,
		required: true
	},
	lozinka: {
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
	tel: {
		type: String,
		default: true
	},
	email: {
		type: String,
		default: true
	},
	slika: {
		type: String,
		default: true
	}
}, 
	{ collection: 'register' }
);

// to access Member outside 
var Register = module.exports = mongoose.model('register', registerSchema);

// Add Member
module.exports.addRegistration = function(registration, callback) {
	Register.create(registration, callback);
};
