// Load required packages
var mongoose = require('mongoose');

// Define our sensor schema
var wsSchema   = new mongoose.Schema({
 datetime: String,
 condoid: Number,
 blocoid: Number,
 sensorid: String,
 poleid: Number,
 level1: Number,
 level2: Number,
 level3: Number,
 level4: Number,
 temp: Number,
 humi: Number
},
{collection : 'reservoir'}
);

// Export the Mongoose model
module.exports = mongoose.model('Ws', wsSchema);