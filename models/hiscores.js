var mongoose = require('mongoose'),
    Schema = mongoose.Schema

var hiscoreSchema = new Schema({
    hiscore: { type: Number },
    name: { type: String },
})

module.exports = mongoose.model('hiscore', hiscoreSchema)
