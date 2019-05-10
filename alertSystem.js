var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + dd + yyyy;

function checkNACStatus(interval)
{
	var request= require('request'); 
	var requestString = 'http://localhost:2323/get_nac_status';
	request(requestString, 
	function (error, response, body) {
		
		console.log('request: ' + requestString);
		console.log('error:', error); // Print the error if one occurred
		console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
		
		if(response && response.statusCode == 200)
		{
			var fs = require('fs');				
			var msg='[' + new Date().toLocaleString() + ']' + ' ' + '[alert.js]: ' + 'E-mail NAC Status Successfully Send. ' +  body + '\n';
			
			fs.appendFile('Log' + today +'.log', msg , function (err) {
			  if (err) throw err;
			  console.log('Log saved!');
			});			
		}
		else 
		{			
			var fs = require('fs');				
			var msg='[' + new Date().toLocaleString() + ']' + ' ' + '[alert.js]: ' + 'Error: ' + response && response.statusCode + '\n' + 'body: ' + body + '\n';
			
			fs.appendFile('Log' + today +'.log', msg , function (err) {
			  if (err) throw err;
			  console.log('Log saved!');
			});			
		}					
	});
}

function checkNACHostConn(interval)
{
	var request= require('request'); 
	var requestString = 'http://localhost:2323/get_nac_host_conn';
	request(requestString, 
	function (error, response, body) {
		
		console.log('request: ' + requestString);
		console.log('error:', error); // Print the error if one occurred
		console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
		
		if(response && response.statusCode == 200)
		{
			var fs = require('fs');				
			var msg='[' + new Date().toLocaleString() + ']' + ' ' + '[alert.js]: ' + 'E-mail NAC Host Connection Successfully Send. ' + body + '\n';
			
			fs.appendFile('Log' + today +'.log', msg , function (err) {
			  if (err) throw err;
			  console.log('Log saved!');
			});			
		}
		else 
		{			
			var fs = require('fs');				
			var msg='[' + new Date().toLocaleString() + ']' + ' ' + '[alert.js]: ' + 'Error: ' + response && response.statusCode + '\n' + 'body: ' + body + '\n';
			
			fs.appendFile('Log' + today +'.log', msg , function (err) {
			  if (err) throw err;
			  console.log('Log saved!');
			});			
		}					
	});
}

function checkTrxTimeout(interval)
{
	var request= require('request'); 
	var requestString = 'http://localhost:2323/get_nac_trx_timeout';
	request(requestString, 
	function (error, response, body) {
		
		console.log('request: ' + requestString);
		console.log('error:', error); // Print the error if one occurred
		console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
		
		if(response && response.statusCode == 200)
		{
			var fs = require('fs');				
			var msg='[' + new Date().toLocaleString() + ']' + ' ' + '[alert.js]: ' + 'E-mail NAC Transaction Timeout Successfully Send. ' + body + '\n';
			
			fs.appendFile('Log' + today +'.log', msg , function (err) {
			  if (err) throw err;
			  console.log('Log saved!');
			});			
		}
		else 
		{			
			var fs = require('fs');				
			var msg='[' + new Date().toLocaleString() + ']' + ' ' + '[alert.js]: ' + 'Error: ' + response && response.statusCode + '\n' + 'body: ' + body + '\n';
			
			fs.appendFile('Log' + today +'.log', msg , function (err) {
			  if (err) throw err;
			  console.log('Log saved!');
			});			
		}					
	});
}

var request = require('request'); 	
console.log('Send alert started...');
var requestString = 'http://localhost:2323/get_status_email_nac';
request(requestString, 
	function (error, response, body) {
	  console.log('Request: ' + requestString);
	  console.log('Error:', error); // Print the error if one occurred
	  console.log('Status Code:', response && response.statusCode); // Print the response status code if a response was received

	var obj = JSON.parse(body);
	console.log('-------------------');
	console.log('NAC Status Email Alert: ' + obj.nac_status[0].FSTATUS_EMAIL);
	console.log('NAC Host Connection Email Alert: ' + obj.nac_host_conn[1].FSTATUS_EMAIL);
	console.log('NAC Transaction Timeout Email Alert: ' + obj.trx_timeout[2].FSTATUS_EMAIL);
	
	console.log('Status interval (minutes): ' + obj.status_interval);
	console.log('Host conn limit (freq.): ' + obj.host_conn_limit);
	console.log('Status interval NAC host conn (minutes): ' + obj.status_interval_nac_host_conn);
	console.log('Transaction timeout limit (freq.): ' + obj.trx_limit);
	console.log('Status interval trx timeout (minutes): ' + obj.status_interval_trx_timeout);
	console.log('-------------------');

	var fs = require('fs');
					
	var msg='[' + new Date().toLocaleString() + ']' + ' ' + '[alert.js]: ' + 'Send alert started' + '\n';

	fs.appendFile('Log' + today +'.log', msg , function (err) {
	  if (err) throw err;
	  //console.log('Log saved!');
	});
	
	msg='[' + new Date().toLocaleString() + ']' + ' ' + '[alert.js]: ' + 'Request: ' + requestString + '\n';
	fs.appendFile('Log' + today +'.log', msg , function (err) {
	  if (err) throw err;
	  //console.log('Log saved!');
	});
	
	msg='[' + new Date().toLocaleString() + ']' + ' ' + '[alert.js]: ' + 'Error: ' + error + '\n';
	fs.appendFile('Log' + today +'.log', msg , function (err) {
	  if (err) throw err;
	  //console.log('Log saved!');
	});
	
	msg='[' + new Date().toLocaleString() + ']' + ' ' + '[alert.js]: ' + 'Status code: ' + response && response.statusCode + '\n';
	fs.appendFile('Log' + today +'.log', msg , function (err) {
	  if (err) throw err;
	  //console.log('Log saved!');
	});	
	
	if(obj.nac_status[0].FSTATUS_EMAIL == 1)
	{	
		console.log('NAC Status Email Alert is Enable');
		console.log('Checking for NAC Status...');
		
		checkNACStatus();				
		setInterval(checkNACStatus, obj.status_interval*60000);
	}
	
	if(obj.trx_timeout[2].FSTATUS_EMAIL == 1)
	{	
		console.log('NAC Trx Timeout Email Alert is Enable');
		console.log('Checking for NAC Host Connection...');
		
		checkTrxTimeout();				
		setInterval(checkTrxTimeout, obj.status_interval_trx_timeout*60000);
	}
	
	if(obj.nac_host_conn[1].FSTATUS_EMAIL == 1)
	{	
		console.log('NAC Host Connection Email Alert is Enable');
		console.log('Checking for NAC Host Connection...');
		
		checkNACHostConn();				
		setInterval(checkNACHostConn, obj.status_interval_nac_host_conn*60000);
	}
	
		
});