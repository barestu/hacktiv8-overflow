const mongoose = require('mongoose')
const Schema = mongoose.Schema

let questionSchema = new Schema ({
  title: {
    type: String,
    required: [true, 'required']
  },
  content: {
    type: String,
    required: [true, 'required']
  },
  poster: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'required']
  },
  voters: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  answers: [{
    type: Schema.Types.ObjectId,
    ref: 'Answer'
  }]
},{
  timestamps: true
})

let Question = mongoose.model('Question', questionSchema)

module.exports = Question