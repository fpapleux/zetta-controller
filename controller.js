var Device = require('zetta-device');
var util = require('util');

var controller = module.exports = function(options) {
  Device.call(this);
  this._default = options['default'];
};
util.inherits(controller, Device);

controller.prototype.init = function(config) {
  config
    .name('System Controller')
    .type('bot')
    .state('idle')
    .when('idle', { allow: ['Log', 'Command']})
    .when('processing command', { allow: []})
    .when('processing log', { allow: []})
    .map('Log', this.log, [{name: 'Log Entry', type: 'text'}])
    .map('Command', this.command, [{name: 'Command', type: 'text'}])
    ;
};

controller.prototype.log = function(message, cb) {
  this.state = 'processing log';
  console.log(message);
  this.state = 'idle';
  cb();
}

controller.prototype.command = function(message, cb) {
  this.state = 'processing command';
  this.log('Executing command: ' + message, cb);
  switch (message) {
    case 'stop':
      console.log ('exiting the program');
      this.state = 'server stopping immediately';
      process.exit(1);
    default:
  }
  this.state = 'idle';
  cb();
};
