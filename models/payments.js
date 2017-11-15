var mongoose = require('mongoose');


var paymentsSchema = mongoose.Schema({
	clenid: {
		type: Number,
		required: true
	},
	vidclenarina: {
		type: Number,
		required: true
	},
	pocetok: {
		type: Date,
		required: true
	},
	kraj: {
		type: Date,
		required: true
	},
	naplata: {
		type: Number,
		required: true
	},
	storniraj: {
		type: Number,
		required: true
	},
	datum_naplata: {
		type: Date,
		required: true
	}
}, 
	{ collection: 'tbl_naplata' }

);

// to access Book outside 
var Payments = module.exports = mongoose.model('Payments', paymentsSchema);

// Get Books
module.exports.getPayments = function(callback, limit) {
	Payments.find(callback).limit(limit);
};
