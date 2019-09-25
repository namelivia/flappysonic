var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var hiscoreSchema = new Schema({
  hiscore:    { type: String },
  name:    { type: Number },
});

module.exports = mongoose.model('hiscore', hiscoreSchema);
