var mongoose = require('mongoose')
var connectionString = 'mongodb://user:user@ds157559.mlab.com:57559/vue-music'
var connection = mongoose.connection


mongoose.connect(connectionString)

connection.on('error', err=>{
  console.log('ERROR FROM DATABASE: ', err)
})


connection.once('open', ()=>{
  console.log('Connected to Database')
})