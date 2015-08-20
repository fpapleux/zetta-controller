module.exports = function controllerApp(server) {
  
  // add query params in the where object like so:
  // var starterDeviceQuery = server.where({type: 'led'});
  var controllerDeviceQuery = server.where({name: 'System Controller'});
  
  server.observe([controllerDeviceQuery], function(controllerDevice){
    setInterval(function(){
      controllerDevice.call('Log', './example/apps/feederApp.js is running', function() {});
    }, 1000);
  });
  
}