var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')
var Schema = mongoose.Schema
var schemaName = 'User'
const SALT = 12

var schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  displayName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  }
})

schema.statics.generateHash = function (password) {
  return bcrypt.hashSync(password, SALT)
}

schema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password)
}

// schema.statics.test = function(){
//   console.log("test")
// }


module.exports = mongoose.model(schemaName, schema)