//function coba coba
//function writeMsg()
function writeMsg(interval)
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

//setInterval(writeMsg, 1000);

var request = require('request'); 
	request('http://localhost:2323/get_datetime_now', 
	function (error, response, body) {
		
		request('http://localhost:2323/get_status_email_nac', 
	
		function (error, response, body) {
		  console.log('error:', error); // Print the error if one occurred
		  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
		  //console.log('body:', body); // Print the HTML for the Google homepage.

		var obj = JSON.parse(body);
		//console.log(typeof(obj));
		console.log('-------------------');
		console.log('status_interval_nac_host_conn ' + obj.status_interval_nac_host_conn);
		console.log('status_interval_trx_timeout ' + obj.status_interval_trx_timeout);
		console.log('-------------------');
		
		console.log('interval: ' + obj.status_interval_nac_host_conn*1000);
		setInterval(writeMsg, obj.status_interval_nac_host_conn*1000);
		
		});
		
		
		
	});