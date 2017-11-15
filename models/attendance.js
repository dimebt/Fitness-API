var mongoose = require('mongoose');


var attendanceSchema = mongoose.Schema({
	clenid: {
		type: Number,
		required: true
	},
	vidclenarina: {
		type: Number,
		required: true
	},
	datumprisutenvreme: {
		type: Date,
		required: true
	}
}, 
	{ collection: 'tbl_prisutnost' }

);

// to access Book outside 
var Attendance = module.exports = mongoose.model('Attendance', attendanceSchema);

// Get Books
module.exports.getAttendance = function(callback, limit) {
	Attendance.find(callback).limit(limit);
};
