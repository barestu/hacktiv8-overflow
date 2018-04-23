const User = require('../models/User')
const Question = require('../models/Question')
const Answer = require('../models/Answer')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

module.exports = {
  findAll: (req, res) => {
    Answer.find()
      .populate('poster', ['_id', 'username', 'email'])
      .populate('question', ['_id', 'title', 'poster'])
      .then(response => {
        res.status(200).send({
          message: 'Show all answer',
          data: response
        })
      })
      .catch(error => {
        res.status(400).send({
          message: 'Show data failed',
          error: error.message
        })
      })
  },

  findOne: (req, res) => {
    Answer.findOne({
      _id: req.params.id
    })
      .populate('poster', ['_id', 'username', 'email'])
      .populate('question', ['_id', 'title', 'poster'])      
      .then(response => {
        res.status(200).send({
          message: 'Show post data',
          data: response
        })
      })
      .catch(error => {
        res.status(400).send({
          message: 'Show post failed',
          error: error.message
        })
      })
  },

  add: (req, res) => {
    let token = req.headers.token
    let decoded = jwt.verify(token, secret)
    let newAnswer = new Answer ({
      answer: req.body.answer,
      question: req.body.question_id,
      poster: decoded.id
    })

    newAnswer.save()
      .then(response => {
        res.status(201).send({
          message: 'Post answer success',
          data: newAnswer
        })
      })
      .catch(error => {
        res.status(400).send({
          message: 'Post anser failed',
          error: error.message
        })
      })
  },

  upvote: (req, res) => {
    let token = req.headers.token
    let decoded = jwt.verify(token, secret)

    Answer.findOneAndUpdate({
      _id: req.params.id
    }, {
      $addToSet: { voter: decoded.id }
    })
      .then(response => {
        res.status(201).send({
          message: 'Upvote post success',
          data: response
        })
      })
      .catch(error => {
        res.status(400).send({
          message: 'Upvote post failed',
          error: error.message
        })
      })
  },
  
  downvote: (req, res) => {
    let token = req.headers.token
    let decoded = jwt.verify(token, secret)

    Answer.findOneAndUpdate({
      _id: req.params.id
    }, {
      $pull: { voter: decoded.id }
    })
      .then(response => {
        res.status(201).send({
          message: 'Downvote post success',
          data: response
        })
      })
      .catch(error => {
        res.status(400).send({
          message: 'Downvote post failed',
          error: error.message
        })
      })
  },

  remove: (req, res) => {
    Answer.deleteOne({
      _id: req.params.id
    })
      .then(response => {
        res.status(200).send({
          message: 'Delete post success',
          data: response
        })
      })
      .catch(error => {
        res.status(400).send({
          message: 'Delete post failed',
          error: error.message
        })
      })
  }
}