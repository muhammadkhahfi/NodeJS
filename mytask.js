var schedule = require('node-schedule');

var j = schedule.scheduleJob('*/1 * * * * *', function(){	//Execute a cron job every Seconds = * * * * * * 
  console.log('The answer to life, the universe, and everything!');
});

//var k = schedule.scheduleJob('*/1 * * * *', function(){	//Execute a cron job every 1 Minutes = */1 * * * *
var k = schedule.scheduleJob('*/3 * * * * *', function(){	//Execute a cron job every 3 Seconds = */3 * * * * *
  console.log('Tada!') ;
});

