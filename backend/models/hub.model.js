const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Hub = new Schema({
   ip: {
      type: String
   },
   remoteId: {
      type: String
   }
}, {
   collection: 'hubs'
})

module.exports = mongoose.model('Hub', Hub)