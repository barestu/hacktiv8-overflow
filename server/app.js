const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const cors = require('cors')
const port = process.env.PORT || 3000
const db_user = process.env.DB_USER
const db_pass = process.env.DB_PASS

const userRoutes = require('./routers/users')
const questionRoutes = require('./routers/questions')
const answerRoutes = require('./routers/answers')

mongoose.connect(`mongodb://${db_user}:${db_pass}@ds157667.mlab.com:57667/h8-overflow`)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('Connected to database...')
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('hacktiv8-overflow rest api')
})

app.use('/api/user', userRoutes)
app.use('/api/question', questionRoutes)
app.use('/api/answer', answerRoutes)

app.listen(port, function() {
  console.log('Listening on port', port)
})