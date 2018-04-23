const router = require('express').Router()
const { loginAuth, adminAuth } = require('../middlewares/auth')
const question = require('../controllers/question_controllers')

router.get('/', question.findAll)
      .get('/:id', question.findOne)
      .post('/add', loginAuth, question.add)
      .put('/update/:id', loginAuth, question.update)
      .delete('/delete/:id', adminAuth, question.remove)
      .patch('/upvote/:id', loginAuth, question.upvote)
      .patch('/downvote/:id', loginAuth, question.downvote)

module.exports = router