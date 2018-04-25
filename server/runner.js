const User = require('./models/User')
const CronJob = require('cron').CronJob;
const axios = require('axios')

let job = new CronJob({
  cronTime: '* * 12 * * 0',
  onTick: function() {
    console.log('tick')
    axios.post('http://35.187.249.89/api/send-email', {}, {})
      .then(response => {
        console.log('get')
      })
      .catch(error => {
        console.log(err)
      })
    /*
     * Runs every Monday
     * at 12:00:00 AM.
     */
  },
  start: false,
  timeZone: 'Asia/Jakarta'
})

job.start()