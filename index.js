var Scout = require('zetta-scout');
var util = require('util');
var Starter = require('./starter');

var StarterScout = module.exports = function() {
  Scout.call(this);
};
util.inherits(StarterScout, Scout);

StarterScout.prototype.init = function(next) {

  var self = this;

  var query = this.server.where({type: 'starter'});

  this.server.find(query, function(err, results) {
    if (results[0]) {
      self.provision(results[0], Starter, {default: 'DEFAULT'});
    } else {
      self.discover(Starter, {default: 'DEFAULT'});
    }
  });

  next();

};
