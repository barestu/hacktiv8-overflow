const User = require('../models/User')
const Question = require('../models/Question')
const Answer = require('../models/Answer')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

module.exports = {
  findAll: (req, res) => {
    Question.find()
      .populate('poster', ['_id', 'username', 'email'])
      .populate({
        path: 'answers',
        populate: [{
          path: 'poster'
        }]
      })
      .then(response => {
        res.status(200).send({
          message: 'Show all question',
          questions: response
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
    Question.findOne({
      _id: req.params.id
    })
      .populate('poster', ['_id', 'username', 'email'])
      .populate({
        path: 'answers',
        populate: [{
          path: 'poster'
        }]
      })
      .then(response => {
        res.status(200).send({
          message: 'Show post data',
          question: response
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
    let newQuestion = new Question ({
      title: req.body.title,
      content: req.body.content,
      poster: decoded.id
    })

    newQuestion.save()
      .then(response => {
        res.status(201).send({
          message: 'Post question success',
          question: newQuestion
        })
      })
      .catch(error => {
        res.status(400).send({
          message: 'Post question failed',
          error: error.message
        })
      })
  },

  update: (req, res) => {
    Question.findOneAndUpdate({
      _id: req.params.id
    }, {
      title: req.body.title,
      content: req.body.content
    })
      .then(response => {
        res.status(201).send({
          message: 'Update post success',
          question: response
        })
      })
      .catch(error => {
        res.status(400).send({
          message: 'Update post failed',
          error: error.message
        })
      })
  },

  upvote: (req, res) => {
    let token = req.headers.token
    let decoded = jwt.verify(token, secret)

    Question.findOneAndUpdate({
      _id: req.params.id
    }, {
      $addToSet: { voters: decoded.id }
    })
      .then(response => {
        res.status(201).send({
          message: 'Upvote post success',
          question: response
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

    Question.findOneAndUpdate({
      _id: req.params.id
    }, {
      $pull: { voters: decoded.id }
    })
      .then(response => {
        res.status(201).send({
          message: 'Downvote post success',
          question: response
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
    Question.deleteOne({
      _id: req.params.id
    })
      .then(response => {
        Answer.remove({
          question: req.params.id
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
      })
      .catch(error => {
        res.status(400).send({
          message: 'Delete post failed',
          error: error.message
        })
      })
  }
}