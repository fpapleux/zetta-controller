var Scout = require('zetta-scout');
var util = require('util');
var controller = require('./controller');

var controllerScout = module.exports = function() {
  Scout.call(this);
};
util.inherits(controllerScout, Scout);

controllerScout.prototype.init = function(next) {

  var self = this;

  var query = this.server.where({type: 'bot'});
  var options = {default: 'DEFAULT'};

  this.server.find(query, function(err, results) {
    if (results[0]) {
      self.provision(results[0], controller, options);
    } else {
      self.discover(controller, options);
    }
  });

  next();

};
