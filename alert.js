var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World!');
}).listen(5050);

var intervalCheckNode = 60000;

setInterval(checkNode, intervalCheckNode);

console.log('time interval ' + intervalCheckNode);

function checkNode()
{      
  $.ajax({
     url: 'get_status_email_nac',
     method: 'GET',                    
     success: function (data) {        

        if(data['nac_status'][0]['FSTATUS_EMAIL'] == 1)
        {
            console.log('alert nac status on');

            //setTimeout(checkNACStatus, intervalCheckNode);    //uncomment this, it just dev only
        }
        
        if(data['nac_host_conn'][1]['FSTATUS_EMAIL'] == 1)
        {
            console.log('alert nac host conn on');
            
            //setTimeout(checkNACHostConn, intervalCheckNode);    //uncomment this, it just dev only
        }      

        if(data['trx_timeout'][2]['FSTATUS_EMAIL'] == 1)
        {
            console.log('alert nac trx timeout on');

            //setTimeout(checkTrxTimeout, intervalCheckNode);    //uncomment this, it just dev only
        }
     }
  });
}