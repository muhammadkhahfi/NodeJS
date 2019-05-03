var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + dd + yyyy;

function sendAlert(interval)
{
	var request= require('request'); 
	request('http://localhost:2323/check_nac_status/20190313135721', 
	function (error, response, body) {
		
		console.log('error:', error); // Print the error if one occurred
		console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
		//console.log('body:', body); // Print the HTML for the Google homepage.		
		
		//var obj = JSON.parse(body);
		//console.log(typeof(obj));
		
		if(response && response.statusCode == 200)
		{
			var fs = require('fs');
		
			//var msg='[' + new Date().toLocaleString() + ']' + ' ' + '[alert.js]: ' + 'Status interval trx timeout: ' + obj.status_interval_trx_timeout + '\n';
			var msg='[' + new Date().toLocaleString() + ']' + ' ' + '[alert.js]: ' + 'E-mail NAC Status Successfully Send' + '\n';
			
			fs.appendFile('Log' + today +'.log', msg , function (err) {
			  if (err) throw err;
			  console.log('Log saved!');
			});			
		}
		else 
		{			
			var fs = require('fs');
		
			//var msg='[' + new Date().toLocaleString() + ']' + ' ' + '[alert.js]: ' + 'Status interval trx timeout: ' + obj.status_interval_trx_timeout + '\n';
			var msg='[' + new Date().toLocaleString() + ']' + ' ' + '[alert.js]: ' + 'Error: ' + response && response.statusCode + '\n' + 'body: ' + body + '\n';
			
			fs.appendFile('Log' + today +'.log', msg , function (err) {
			  if (err) throw err;
			  console.log('Log saved!');
			});			
		}		
				
	});
}

var request = require('request'); 
request('http://localhost:2323/get_datetime_now', 
function (error, response, body) {
	
	console.log('Send alert started...');
	var rq = 'http://localhost:2323/get_status_email_nac';
	request(rq, 
	function (error, response, body) {
	  console.log('Request: ' + rq);
	  console.log('error:', error); // Print the error if one occurred
	  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	  //console.log('body:', body); // Print the HTML for the Google homepage.

	var obj = JSON.parse(body);
	//console.log(typeof(obj));
	console.log('-------------------');
	console.log('status_interval: ' + obj.status_interval);
	console.log('status_interval_nac_host_conn: ' + obj.status_interval_nac_host_conn);
	console.log('status_interval_trx_timeout: ' + obj.status_interval_trx_timeout);
	console.log('-------------------');
	
	//setInterval(writeMsg, obj.status_interval_nac_host_conn*1000);		
	setInterval(sendAlert, obj.status_interval*60000);		
	
	});		
});