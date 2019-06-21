const request = require('request');
const fs = require('fs');
const config = require('./config.json');
const intervalTimeAlert = 60000; //interval is miliseconds
const logFileName = config.LogFilePath + '/NACMonitoringLog' + getDateToday() + '.log';

//Execute main function
main();


function getDateToday() {
	let today = new Date();
	let dd = String(today.getDate()).padStart(2, '0');
	let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	let yyyy = today.getFullYear();
	today = mm + dd + yyyy;

	return today;
}

function getSubstractDate(days) {
	let today = new Date();
	today.setDate(today.getDate() - days); //dev only
	let dd = String(today.getDate()).padStart(2, '0');
	let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	let yyyy = today.getFullYear();
	today = mm + dd + yyyy;

	return today;
}

function getSubstractDateRange(days) {
	let arrDate = new Array();

	for (day = 1; day <= days; day++) {
		let today = new Date();
		today.setDate(today.getDate() - day); //dev only
		let dd = String(today.getDate()).padStart(2, '0');
		let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		let yyyy = today.getFullYear();
		today = mm + dd + yyyy;
		arrDate.push(today);
	}

	return arrDate;
}

function checkLog() {
	fs.readdir(config.LogFilePath, (err, files) => {
		if (err) throw err;

		let backDate = getSubstractDateRange(config.BackDate);

		backDate.push(getDateToday());

		//console.log('keep date: ' + backDate);
		
		if (files.length > 0) {
			for (const file of files) {
				let fileName = file.substring(file.length - 12, file.length - 4);

				if (backDate.includes(fileName) == false) {
					//delete file					
					fs.unlink(config.LogFilePath + '/' + file, err => {
						if (err) throw err;
					});					
				}
			}
		}
	});
}

function main() {
	let msg = '';
	const requestString = config.WebServer + '/' + config.GetStatusEmailURL;

	checkLog();

	msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'Alert System  Started...' + '\n';
	fs.appendFile(logFileName, msg, function (err) {
		if (err) throw err;
		//console.log('Log saved!');
	});

	msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'HTTP Request: ' + requestString + '\n';
	fs.appendFile(logFileName, msg, function (err) {
		if (err) throw err;
		//console.log('Log saved!');
	});

	request(requestString,
		function (error, response, body) {

			let obj = JSON.parse(body);

			msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'Response Status Code: ' + response.statusCode + '\n';
			fs.appendFile(logFileName, msg, function (err) {
				if (err) throw err;
				//console.log('Log saved!');
			});

			if (error != null) {
				msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'Error: ' + error + '\n';
				fs.appendFile(logFileName, msg, function (err) {
					if (err) throw err;
					//console.log('Log saved!');
				});
			}

			let nac_status_email = obj.nac_status[0].FSTATUS_EMAIL;
			let nac_status_sms = obj.nac_status[0].FSTATUS_SMS;
			let nac_host_conn_email = obj.nac_host_conn[1].FSTATUS_EMAIL;
			let nac_host_conn_sms = obj.nac_host_conn[1].FSTATUS_SMS;
			let nac_trx_timeout_email = obj.trx_timeout[2].FSTATUS_EMAIL;
			let nac_trx_timeout_sms = obj.trx_timeout[2].FSTATUS_SMS;

			nac_status_email == 1 ? nac_status_email = "ON" : nac_status_email = "OFF";
			nac_status_sms == 1 ? nac_status_sms = "ON" : nac_status_sms = "OFF";

			nac_host_conn_email == 1 ? nac_host_conn_email = "ON" : nac_host_conn_email = "OFF";
			nac_host_conn_sms == 1 ? nac_host_conn_sms = "ON" : nac_host_conn_sms = "OFF";

			nac_trx_timeout_email == 1 ? nac_trx_timeout_email = "ON" : nac_trx_timeout_email = "OFF";
			nac_trx_timeout_sms == 1 ? nac_trx_timeout_sms = "ON" : nac_trx_timeout_sms = "OFF";


			msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'Alert NAC Status Email: ' + nac_status_email + '\n';
			fs.appendFile(logFileName, msg, function (err) {
				if (err) throw err;
				//console.log('Log saved!');
			});

			msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'Alert NAC Status SMS: ' + nac_status_sms + '\n';
			fs.appendFile(logFileName, msg, function (err) {
				if (err) throw err;
				//console.log('Log saved!');
			});

			msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'NAC Status Resent Time (minutes): ' + obj.status_interval + '\n';
			fs.appendFile(logFileName, msg, function (err) {
				if (err) throw err;
				//console.log('Log saved!');
			});


			msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'Alert NAC Host Connection Status Email: ' + nac_host_conn_email + '\n';
			fs.appendFile(logFileName, msg, function (err) {
				if (err) throw err;
				//console.log('Log saved!');
			});

			msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'Alert NAC Host Connection Status SMS: ' + nac_host_conn_sms + '\n';
			fs.appendFile(logFileName, msg, function (err) {
				if (err) throw err;
				//console.log('Log saved!');
			});

			msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'NAC Host Connection Resent Time (minutes): ' + obj.status_interval_nac_host_conn + '\n';
			fs.appendFile(logFileName, msg, function (err) {
				if (err) throw err;
				//console.log('Log saved!');
			});

			msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'NAC Host Connection Limit (freq.): ' + obj.host_conn_limit + '\n';
			fs.appendFile(logFileName, msg, function (err) {
				if (err) throw err;
				//console.log('Log saved!');
			});


			msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'Alert NAC Transaction Timeout Email: ' + nac_trx_timeout_email + '\n';
			fs.appendFile(logFileName, msg, function (err) {
				if (err) throw err;
				//console.log('Log saved!');
			});

			msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'Alert NAC Transaction Timeout SMS: ' + nac_trx_timeout_sms + '\n';
			fs.appendFile(logFileName, msg, function (err) {
				if (err) throw err;
				//console.log('Log saved!');
			});

			msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'NAC Transaction Timeout Resent Time (minutes): ' + obj.status_interval_trx_timeout + '\n';
			fs.appendFile(logFileName, msg, function (err) {
				if (err) throw err;
				//console.log('Log saved!');
			});

			msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'Transaction Timeout Limit (freq.): ' + obj.trx_limit + '\n';
			fs.appendFile(logFileName, msg, function (err) {
				if (err) throw err;
				//console.log('Log saved!');
			});


			if (obj.nac_status[0].FSTATUS_EMAIL == 1) {
				checkNACStatus();
				setInterval(checkNACStatus, obj.status_interval * intervalTimeAlert);
			}

			if (obj.trx_timeout[2].FSTATUS_EMAIL == 1) {
				checkTrxTimeout();
				setInterval(checkTrxTimeout, obj.status_interval_trx_timeout * intervalTimeAlert);
			}

			if (obj.nac_host_conn[1].FSTATUS_EMAIL == 1) {
				checkNACHostConn();
				setInterval(checkNACHostConn, obj.status_interval_nac_host_conn * intervalTimeAlert);
			}
		});
}

function checkNACStatus(interval) {	
	const requestString = config.WebServer + '/' + config.EmailChekNACStatusURL;
	request(requestString,
		function (error, response, body) {

			let msg = '';

			msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'HTTP Request: ' + requestString + '\n';
			fs.appendFile(logFileName, msg, function (err) {
				if (err) throw err;
				//console.log('Log saved!');
			});

			msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'Response Status Code: ' + response.statusCode + '\n';
			fs.appendFile(logFileName, msg, function (err) {
				if (err) throw err;
				//console.log('Log saved!');
			});

			if (error != null) {
				msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'Error: ' + error + '\n';
				fs.appendFile(logFileName, msg, function (err) {
					if (err) throw err;
					//console.log('Log saved!');
				});
			}

			if (response && response.statusCode == 200) {
				body = JSON.parse(body);

				msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'Process: ' + body.info + '\n';
				fs.appendFile(logFileName, msg, function (err) {
					if (err) throw err;
					//console.log('Log saved!');
				});

				msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'Total NAC Off Status: ' + (body.result).length + '\n';
				fs.appendFile(logFileName, msg, function (err) {
					if (err) throw err;
					//console.log('Log saved!');
				});

				for (i = 0; i < (body.result).length; i++) {
					msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'Name: ' + body.result[i].fname + '\n';
					fs.appendFile(logFileName, msg, function (err) {
						if (err) throw err;
						//console.log('Log saved!');
					});

					msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'IP Address' + '[' + body.result[i].fname + ']: ' + body.result[i].fipaddr + '\n';
					fs.appendFile(logFileName, msg, function (err) {
						if (err) throw err;
						//console.log('Log saved!');
					});

					msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'Status ' + '[' + body.result[i].fname + ']: ' + body.result[i].status + '\n';
					fs.appendFile(logFileName, msg, function (err) {
						if (err) throw err;
						//console.log('Log saved!');
					});

					msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'Last Active ' + '[' + body.result[i].fname + ']: ' + body.result[i].last_active + '\n';
					fs.appendFile(logFileName, msg, function (err) {
						if (err) throw err;
						//console.log('Log saved!');
					});
				}

				msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'Email To: ' + body.email_to + '\n';
				fs.appendFile(logFileName, msg, function (err) {
					if (err) throw err;
					//console.log('Log saved!');
				});

				msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'Email Cc: ' + body.email_cc + '\n';
				fs.appendFile(logFileName, msg, function (err) {
					if (err) throw err;
					//console.log('Log saved!');
				});

				msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'Email Bcc: ' + body.email_bcc + '\n';
				fs.appendFile(logFileName, msg, function (err) {
					if (err) throw err;
					//console.log('Log saved!');
				});

				msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'E-mail NAC Status Successfully Send\n';
				fs.appendFile(logFileName, msg, function (err) {
					if (err) throw err;
					//console.log('Log saved!');
				});
			} else {
				msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'E-mail NAC Status Failed to Send\n';
				fs.appendFile(logFileName, msg, function (err) {
					if (err) throw err;
					//console.log('Log saved!');
				});

			}
		});
}

function checkNACHostConn(interval) {	
	const requestString = config.WebServer + '/' + config.EmailChekNACHostConnURL;
	request(requestString,
		function (error, response, body) {

			let msg = '';

			msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'HTTP Request: ' + requestString + '\n';
			fs.appendFile(logFileName, msg, function (err) {
				if (err) throw err;
				//console.log('Log saved!');
			});

			msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'Response Status Code: ' + response.statusCode + '\n';
			fs.appendFile(logFileName, msg, function (err) {
				if (err) throw err;
				//console.log('Log saved!');
			});

			if (error != null) {
				msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'Error: ' + error + '\n';
				fs.appendFile(logFileName, msg, function (err) {
					if (err) throw err;
					//console.log('Log saved!');
				});
			}

			if (response && response.statusCode == 200) {
				body = JSON.parse(body);

				msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'Process: ' + body.info + '\n';
				fs.appendFile(logFileName, msg, function (err) {
					if (err) throw err;
					//console.log('Log saved!');
				});

				msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'Total NAC Connection Not Established: ' + (body.result).length + '\n';
				fs.appendFile(logFileName, msg, function (err) {
					if (err) throw err;
					//console.log('Log saved!');
				});

				for (i = 0; i < (body.result).length; i++) {
					msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'Name: ' + body.result[i].fname + '\n';
					fs.appendFile(logFileName, msg, function (err) {
						if (err) throw err;
						//console.log('Log saved!');
					});

					msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'IP Address' + '[' + body.result[i].fname + ']: ' + body.result[i].fipaddr + '\n';
					fs.appendFile(logFileName, msg, function (err) {
						if (err) throw err;
						//console.log('Log saved!');
					});

					msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'Status ' + '[' + body.result[i].fname + ']: ' + body.result[i].status + '\n';
					fs.appendFile(logFileName, msg, function (err) {
						if (err) throw err;
						//console.log('Log saved!');
					});

					msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'DateTime ' + '[' + body.result[i].fname + ']: ' + body.result[i].datetime + '\n';
					fs.appendFile(logFileName, msg, function (err) {
						if (err) throw err;
						//console.log('Log saved!');
					});
				}

				msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'Email To: ' + body.email_to + '\n';
				fs.appendFile(logFileName, msg, function (err) {
					if (err) throw err;
					//console.log('Log saved!');
				});

				msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'Email Cc: ' + body.email_cc + '\n';
				fs.appendFile(logFileName, msg, function (err) {
					if (err) throw err;
					//console.log('Log saved!');
				});

				msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'Email Bcc: ' + body.email_bcc + '\n';
				fs.appendFile(logFileName, msg, function (err) {
					if (err) throw err;
					//console.log('Log saved!');
				});

				msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'E-mail NAC Status Successfully Send\n';
				fs.appendFile(logFileName, msg, function (err) {
					if (err) throw err;
					//console.log('Log saved!');
				});
			} else {
				msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'E-mail NAC Host Connections Status Failed to Send\n';
				fs.appendFile(logFileName, msg, function (err) {
					if (err) throw err;
					//console.log('Log saved!');
				});
			}
		});
}

function checkTrxTimeout(interval) {	
	const requestString = config.WebServer + '/' + config.EmailChekNACTrxTimeoutURL;
	request(requestString,
		function (error, response, body) {

			let msg = '';

			msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'HTTP Request: ' + requestString + '\n';
			fs.appendFile(logFileName, msg, function (err) {
				if (err) throw err;
				//console.log('Log saved!');
			});

			msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'Response Status Code: ' + response.statusCode + '\n';
			fs.appendFile(logFileName, msg, function (err) {
				if (err) throw err;
				//console.log('Log saved!');
			});

			if (error != null) {
				msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'Error: ' + error + '\n';
				fs.appendFile(logFileName, msg, function (err) {
					if (err) throw err;
					//console.log('Log saved!');
				});
			}

			if (response && response.statusCode == 200) {

				body = JSON.parse(body);

				msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'Process: ' + body.info + '\n';
				fs.appendFile(logFileName, msg, function (err) {
					if (err) throw err;
					//console.log('Log saved!');
				});

				msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'Total NAC Transaction Timeout: ' + (body.result).length + '\n';
				fs.appendFile(logFileName, msg, function (err) {
					if (err) throw err;
					//console.log('Log saved!');
				});

				for (i = 0; i < (body.result).length; i++) {
					msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'Name: ' + body.result[i].fname + '\n';
					fs.appendFile(logFileName, msg, function (err) {
						if (err) throw err;
						//console.log('Log saved!');
					});

					msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'IP Address' + '[' + body.result[i].fname + ']: ' + body.result[i].fipaddr + '\n';
					fs.appendFile(logFileName, msg, function (err) {
						if (err) throw err;
						//console.log('Log saved!');
					});

					msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'Status ' + '[' + body.result[i].fname + ']: ' + body.result[i].status + '\n';
					fs.appendFile(logFileName, msg, function (err) {
						if (err) throw err;
						//console.log('Log saved!');
					});

					msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'DateTime ' + '[' + body.result[i].fname + ']: ' + body.result[i].datetime + '\n';
					fs.appendFile(logFileName, msg, function (err) {
						if (err) throw err;
						//console.log('Log saved!');
					});
				}

				msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'Email To: ' + body.email_to + '\n';
				fs.appendFile(logFileName, msg, function (err) {
					if (err) throw err;
					//console.log('Log saved!');
				});

				msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'Email Cc: ' + body.email_cc + '\n';
				fs.appendFile(logFileName, msg, function (err) {
					if (err) throw err;
					//console.log('Log saved!');
				});

				msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'Email Bcc: ' + body.email_bcc + '\n';
				fs.appendFile(logFileName, msg, function (err) {
					if (err) throw err;
					//console.log('Log saved!');
				});

				msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'E-mail NAC Status Successfully Send\n';
				fs.appendFile(logFileName, msg, function (err) {
					if (err) throw err;
					//console.log('Log saved!');
				});
			} else {
				msg = '[' + new Date().toLocaleString() + ']' + ' ' + '[alertsystem.js]: ' + 'E-mail NAC Host Connections Status Failed to Send\n';
				fs.appendFile(logFileName, msg, function (err) {
					if (err) throw err;
					//console.log('Log saved!');
				});
			}
		});
}
