var express = require('express')
var bp = require('body-parser')
var app = express()
var cors = require('cors')
var port = 3000

app.use(cors())
//Fire up database connection
require('./db/mlab-config')

app.use(bp.json())
app.use(bp.urlencoded({
  extended: true
}))

let auth = require('./auth/auth')
app.use(auth.session)
app.use(auth.router)

var songs = require('./routes/playlists')

app.use(songs.router)

app.get('*', (req, res, next) => {
  res.status(404).send({
    error: 'No matching routes'
  })
})


app.listen(port, () => {
  console.log('server running on port', port)
})