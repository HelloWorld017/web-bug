var bug = require('./bug');
var chalk = require('chalk');
var express = require('express');
var http = require('http');
var process = require('process');

global.events = require('./events');

require('./script-loader');

var cert = process.env.CERT === 'true';

var app = express();

app.get('/:tag/:data', (req, res, next) => {
	var data = {
		request: req,
		tag: req.params.tag,
		data: req.params.data
	};

	global.events.emit('track', data);
	global.events.emit('tag.' + req.params.tag, data);

	res.status(200).type('image/gif').send(bug);
});

var onErr = (err) => {
	if(err.syscall !== 'listen') throw err;

	switch(err.code){
		case 'EACCES':
			console.error(chalk.red('Permission Denied!'));
			process.exit(1);
			return;

		case 'EADDRINUSE':
			console.error(chalk.red('Address in use!'));
			process.exit(1);
			return;
	}

	throw error;
};

var onListening = () => {
	var addr = httpServer.address();
	console.log(chalk.cyan((typeof addr === 'string') ? 'Pipe ' + addr : 'Listening on port ' + addr.port));
};

var normalizePort = (val) => {
	var portNumber = parseInt(val, 10);

	if(isNaN(portNumber)){
		return val;
	}

	if(portNumber >= 0){
		return portNumber;
	}

	return false;
});

var port = nomalizePort(process.env.PORT || '80');
var httpsPort = nomalizePort(process.env.HTTPS_PORT || '443');

if(cert){
	var key = fs.readFileSync(process.env.KEY_LOCATION || 'key.pem');
	var cert = fs.readFileSync(process.env.CERT_LOCATION || 'cert.pem');
	var httpsServer = http.createServer({
		key: key,
		cert: cert
	}, app);
	httpsServer.on('error', onErr);
	httpsServer.on('listening', onListening);
	httpsServer.listen(httpsPort);
}

var httpServer = http.createServer(app);
httpServer.on('error', onErr);
httpServer.on('listening', onListening);
httpServer.listen(port);
