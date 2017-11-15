var mongoose = require('mongoose');


var trafficGraphSchema = mongoose.Schema({
	opisperiod: {
		type: String,
		required: true
	},
	vkupno: {
		type: Number,
		required: true
	}
}, 
	{ collection: 'graph' }

);

// to access Book outside 
var TrafficGraph = module.exports = mongoose.model('TrafficGraph', trafficGraphSchema);

// Get Books
module.exports.getTrafficGraph = function(callback, limit) {
	TrafficGraph.find(callback).limit(limit);
};
