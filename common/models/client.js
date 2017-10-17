'use strict';

module.exports = function(Client) {



Client.afterRemote('login', function( ctx, modelInstance, next) {
    
		Client.findById(modelInstance.userId, function(err, client){
			if(err){
				next();
				return;
			}
			modelInstance.name = client.name;
			modelInstance.lastName = client.lastName;			
			modelInstance.phone = client.phone;
			modelInstance.email = client.email;

			next();
		})
    
	});






};
