var request = require('request');
//request('http://localhost:2323/check_nac_status/20190313163651', 
request('http://localhost:2323/get_status_email_nac', 
function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.

var obj = JSON.parse(body);
//console.log(typeof(obj));
console.log('NAC Status ' + obj.nac_status[0].FSTATUS_EMAIL);
console.log('NAC Host Conn ' + obj.nac_host_conn[1].FSTATUS_EMAIL);
console.log('TRX Timeout ' + obj.trx_timeout[2].FSTATUS_EMAIL);
console.log('-------------------');
});


//TAMBAHAN
function intervalFunc() {
  //console.log('Cant stop me now!');

var request = require('request');
request('http://localhost:2323/check_nac_status/20190313163651', 
//request('http://localhost:2323/get_status_email_nac', 
function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
  console.log('-------------------');
});

}

//Uncomment this line to sending alert email, repeat every minute
//setInterval(intervalFunc, 60000);

//var timenow = new Date().toLocaleString();
//console.log(timenow);

var requestDate = require('request'); 
requestDate('http://localhost:2323/get_datetime_now', 
function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
  console.log('-------------------');
});


//function coba coba
function writeMsg()
{
	//console.log('can\'t stop...');
	
	
	
	var requestDate = require('request'); 
	requestDate('http://localhost:2323/get_datetime_now', 
	function (error, response, body) {
		
		var fs = require('fs');
		
		var msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[coba.js]: ' + 'Date: ' + body + '\n';
		
		var datetime = new Date().toLocaleString();
		
		fs.appendFile('Log' + '.txt', msg , function (err) {
		  if (err) throw err;
		  console.log('Saved!');
		}); 
		
	});

}
setInterval(writeMsg, 1000);






