var mongoose = require('mongoose')
var Schema = mongoose.Schema
var schemaName = 'Song'
var ObjectId = Schema.Types.ObjectId

var schema = new Schema({
  kind: {type: String, required: true},
  title: {type: String, required: true},
  albumArt: {type: String, required: true},
  artist: {type: String, required: true},
  collection: {type: String, required: true},
  price: {type: String, required: true},
  preview: {type: String, required: true},
  trackUrl: {type: String, required: true},
  artistId: {type: String, required: true}
})

var listSchema = new Schema({
  title: {type: String, required: true},
  songs: [schema],
  userId:{
    type: ObjectId,
    ref: "User",
    required:true
  }
})

module.exports = mongoose.model(schemaName, listSchema)