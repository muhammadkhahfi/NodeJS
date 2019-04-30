const CronJob = require('cron').CronJob
     const CronTime = require('cron').CronTime

     const a = new CronJob('*/4 * * * * *', function () {
       run() // function called inside cron
     }, null, false)

     let run = () => {
       console.log('function called')
     }

     let scheduler = () => {
       console.log('CRON JOB STARTED WILL RUN IN EVERY 4 SECOND')
       a.start()
     }

     let schedulerStop = () => {
       a.stop()
       console.log('scheduler stopped')
     }

     let schedulerStatus = () => {
       console.log('cron status ---->>>', a.running)
     }

     let changeTime = (input) => {
       a.setTime(new CronTime(input))
       console.log('changed to every 1 second')
     }

     scheduler()
     setTimeout(() => { schedulerStatus() }, 1000)
     setTimeout(() => { schedulerStop() }, 9000)
     setTimeout(() => { schedulerStatus() }, 10000)
     setTimeout(() => { changeTime('* * * * * *') }, 11000)
     setTimeout(() => { scheduler() }, 12000)
     setTimeout(() => { schedulerStop() }, 16000)