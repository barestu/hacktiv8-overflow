const router = require('express').Router()
const { loginAuth, adminAuth } = require('../middlewares/auth')
const { register, login, findAll, findOne } = require('../controllers/user_controllers')

router.get('/', findAll)
      .get('/:id', findOne)
      .post('/register', register)
      .post('/login', login)

module.exports = router