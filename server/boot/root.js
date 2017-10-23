'use strict';

module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  
	//Socket io libs
	var http = require('http');
	var httpServer = http.createServer(server);
	var io = require('socket.io').listen(httpServer);
	//for socket io
	httpServer.listen(3001);

	//import models
	var Client = app.models.Client;
	var Taxi = app.models.Taxi;
	var TypeEntity = app.models.TypeEntity;

	//global vars
	var clientsSockets = [];
	var taxisSockets = [];

	//constans
	var CLIENT_TYPE_NAME = "CLIENT";
	var TAXI_TYPE_NAME = "TAXI";
	var typeClient = {
		name: CLIENT_TYPE_NAME
	};
	var typeTaxi = {
		name: TAXI_TYPE_NAME
	};



	TypeEntity.create(typeClient, function(err, typeCreated){
		console.log("CLIENT TYPE CREATED");
	});
	TypeEntity.create(typeTaxi, function(err, typeCreated){
		console.log("TAXI TYPE CREATED");
	});


	io.on('connection', function (socket) {
	  
	  socket.emit('who-are-you', {});
	  socket.on('token-Registration', function (data) {
	  	var type = data.type;
	  	if(type == CLIENT_TYPE_NAME){
	  		clientsSockets.push(socket);
	  	}else if(type == TAXI_TYPE_NAME){
	  		taxisSockets.push(socket);
	  	}
	    socket.emit('connection-aproved', {message: "Bienvenido"});
	  });


	  socket.on('disconnect', function (data) {	   
	    socket.emit('out', {message: "your re agoin to be disconnected"});
	    socket.disconnect()
	  });


	});




  server.use(router);
};
