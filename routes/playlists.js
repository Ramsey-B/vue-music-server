var router = require('express').Router()
var Songs = require('../models/song')
var Users = require('../models/user')
let session = require('../auth/sessions')


//get all users playlists
router.get('/get-playlists', (req, res) => {
  Users.findById(req.session.uid)
    .then(user => {
      if (!user) {
        res.status(401).send({message: "Please Log in"})
      }
      Songs.find({
        userId: user._id
      }).then(playlists => {
        res.status(200).send(playlists)
      })
    })
    .catch(err => {
      res.status(500).send({message: "An Error occured"})
    })
})

//new playlist
router.post('/playlist', (req, res) => {
  Users.findById(req.session.uid)
    .then(user => {
      if (user._id != req.body.userId) {
        res.status(400).send({message: "Permission not granted"})
      }
      Songs.create(req.body)
      .then(newList => {
        res.status(200).send(newList)
      })
      .catch(err => {
        res.status(400).send({message: "An Error occured"})
      })
    })
    .catch(err => {
      res.status(401).send({message: "Please Log in"})
    })
}) 

//add to playlist
router.put('/playlist/:id', (req, res) => {
  Users.findById(req.session.uid)
    .then(user => {
      Songs.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      })
      .then(list => {
        res.status(200).send(list)
      })
      .catch()
    })
})















module.exports = {
  router
}

