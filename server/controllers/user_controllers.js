const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const secret = process.env.SECRET

module.exports = {
  register: (req, res) => {
    let newUser = new User ({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    })

    newUser.save()
      .then(response => {
        res.status(201).send({
          message: 'Register success',
          user: newUser
        })
      })
      .catch(error => {
        if (error.code === 11000) {
          error.message = 'Email already used'
        }
        res.status(400).send({
          message: 'Register failed',
          error: error.message
        })
      })
  },

  login: (req, res) => {
    let plainPass = req.body.password

    User.findOne({
      email: req.body.email
    })
      .then(user => {
        bcrypt.compare(plainPass, user.password, function (error, found) {
          if (found) {
            let token = jwt.sign({
              id: user._id,
              username: user.username,
              email: user.email,
              role: user.role
            }, secret)

            res.status(200).send({
              message: 'Login success',
              token: token
            })
          } else {
            res.status(400).send({
              message: 'Invalid password',
              error: error.message
            })
          }
        })
      })
      .catch(error => {
        res.status(400).send({
          message: 'Invalid email',
          error: error.message
        })
      })
  },

  findAll: (req, res) => {
    User.find()
      .then(response => {
        res.status(200).send({
          message: 'Show All user',
          users: response
        })
      })
      .catch(error => {
        res.status(400).send({
          message: 'Show data user failed',
          error: error.message
        })
      })
  },

  findOne: (req, res) => {
    User.findOne({
      _id: req.params.id
    })
      .then(response => {
        res.status(200).send({
          message: 'Show user',
          user: response
        })
      })
      .catch(error => {
        res.status(400).send({
          message: 'Show user failed',
          error: error.message
        })
      })
  }
}