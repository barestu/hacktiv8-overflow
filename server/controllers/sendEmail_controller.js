const User = require('../models/User')
const nodemailer =  require('nodemailer')
const user_email = process.env.EMAIL_ID
const user_pass = process.env.EMAIL_PASS

module.exports = {
  sendEmail: (req, res) => {
    let mailOptions = {}
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: user_email,
        pass: user_pass
      }
    })
    
    User.find()
     .then(response => {
       response.forEach(user => {
         console.log(user.email)
         mailOptions = {
          from: user_email,
          to: user.email,
          subject: 'Hacktiv8 Overflow For You!',
          text: 'Check out top discussions on h8verflow.barestu.com!'
        }
        
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log('Send email success!', info.response);
          }
        })
      
        res.status(201).send('Send email success')
       })
     })
     .catch(error => {
       console.log('error', error)
     })
  }
}
