// Load required packages
var mongoose = require('mongoose');

// Define o schema do espaço Gourmet
var egSchema   = new mongoose.Schema({
    datetime: String,
    sensorid: String,
    condoid: Number,
    blocoid: Number,
	spaceid: Number,
	presencecnt: Number,
	tempspace: Number,
	tempext: Number,
	humispace: Number,
	humiext: Number
},
{collection : 'gourmet'}
);

// Export the Mongoose model
module.exports = mongoose.model('Eg', egSchema);