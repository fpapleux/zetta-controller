var zetta = require('zetta');
var controller = require('../index');
var controllerApp = require('./apps/controllerApp');

var serverPort = (process.argv[2] || 1337);
var serverName = (process.argv[3] || 'System Controller');

zetta()
	.name(serverName)
	.use(controller)
	.use(controllerApp)
	.listen(serverPort);
