const router = require('express').Router()
const { loginAuth, adminAuth } = require('../middlewares/auth')
const answer = require('../controllers/answer_controllers')

router.get('/', answer.findAll)
      .get('/:id', answer.findOne)
      .post('/add', loginAuth, answer.add)
      .delete('/delete/:id', adminAuth, answer.remove)
      .patch('/upvote/:id', loginAuth, answer.upvote)
      .patch('/downvote/:id', loginAuth,  answer.downvote)

module.exports = router