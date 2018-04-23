const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

let userSchema = new Schema ({
  username: {
    type: String,
    required: [true, 'required']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'required'],
    match: [/\S+@\S+\.\S+/, 'Invalid email format!']
  },
  password: {
    type: String,
    required: [true, 'required']
  },
  role: {
    type: String,
    default: 'user'
  }
},{
  timestamps: true
})

userSchema.pre('save', function (next) {
  let saltRounds = 10
  let salt = bcrypt.genSaltSync(saltRounds) 
  let hash = bcrypt.hashSync(this.password, salt)

  this.password = hash

  next()
})

let User = mongoose.model('User', userSchema)

module.exports = User