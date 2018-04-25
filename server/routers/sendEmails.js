const router = require('express').Router()
const { sendEmail } = require('../controllers/sendEmail_controller')

router.post('/', sendEmail)

module.exports = router