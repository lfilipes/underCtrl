var mongoose = require('mongoose')
  mongoose.connect( 'mongodb://lfilipe.email:mlab123@ds139949.mlab.com:39949/mlabsensordb', function () {
  //mongoose.connect('mongodb://localhost/sensordb', function () {  
  console.log('mongodb connected to mLab: ds139949.mlab.com:39949/mlabsensordb')
  //console.log('mongodb connected to local mongodb')
})
module.exports = mongoose
