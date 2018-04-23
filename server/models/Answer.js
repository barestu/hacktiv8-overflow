const mongoose = require('mongoose')
const Schema = mongoose.Schema

let answerSchema = new Schema ({
  answer: {
    type: String,
    required: [true, 'required']
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: [true, 'required']
  },
  poster: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'required']
  },
  voter: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
},{
  timestamps: true
})

let Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer