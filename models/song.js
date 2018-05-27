var mongoose = require('mongoose')
var Schema = mongoose.Schema
var schemaName = 'Song'
var ObjectId = Schema.Types.ObjectId

var song = new Schema({
  trackName: {type: String, required: true},
  artworkUrl100: {type: String, required: true},
  artistName: {type: String, required: true},
  trackPrice: {type: String, required: true},
  previewUrl: {type: String, required: true},
  trackUrl: {type: String, required: true},
  trackId: {type: String, required: true, unique: true}
})

var schema = new Schema({
  title: {type: String, required: true},
  songs: [song],
  author: {type: String},
  userId:{
    type: ObjectId,
    ref: "User",
    required:true
  }
})

module.exports = mongoose.model(schemaName, schema)