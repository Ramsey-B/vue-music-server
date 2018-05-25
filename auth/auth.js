let router = require('express').Router();
let Users = require('../models/user');
let session = require('./sessions')

let loginError = new Error('Bad Email or Password')

router.post('/register', (req, res) => {
  //Users.test()
  req.body.password = Users.generateHash(req.body.password)
  Users.create(req.body)
    .then(user => {
      delete user._doc.password
      req.session.uid = user._id
      res.send(user)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})


router.post('/login', (req, res) => {
  Users.findOne({ email: req.body.email })
    .then(user => {
      user.validatePassword(req.body.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).send({ error: 'Invalid Email or Password' })
          }
          req.session.uid = user._id;
          user.password = null
          delete user.password
          res.send({
            message: 'successfully logged in',
            data: user
          })
        })
        .catch(err => {
          res.status(401).send({mesage: 'Invalid Email or Password' })
        })
    })
    .catch(err => {
      res.status(401).send({
        error: err,
        message: 'Invalid Email or Password'
      })
    })
})

router.delete('/logout', (req, res) => {
  req.session.destroy(() => {
    res.send({
      message: 'You have successfully been logged out. Please come back soon!'
    })

  })
})

router.get('/authenticate', (req, res) => {
  Users.findById(req.session.uid).then(user => {
    req.session.uid = user._id;
    user.password = null
    delete user.password
    if (!user) {
      return res.status(401).send({ "error": "Please Login" })
    }
    return res.send({
      data: user
    })
  }).catch(err => {
    return res.status(500).send({
      error: err
    })
  })
})

module.exports = {
  router,
  session
}