var mongoose = require('mongoose')
var Schema = mongoose.Schema
var schemaName = 'Song'
var ObjectId = Schema.Types.ObjectId

var song = new Schema({
  kind: {type: String, required: true},
  title: {type: String, required: true},
  albumArt: {type: String, required: true},
  artist: {type: String, required: true},
  price: {type: String, required: true},
  preview: {type: String, required: true},
  trackUrl: {type: String, required: true},
  artistId: {type: String, required: true}
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