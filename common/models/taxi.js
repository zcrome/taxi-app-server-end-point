'use strict';

module.exports = function(Taxi) {




	Taxi.afterRemote('login', function( ctx, modelInstance, next) {
    

		Taxi.findById(modelInstance.userId, function(err, taxi){
			if(err){
				next();
				return;
			}

			taxi.updateAttributes({isOnline: true}, function(err, obj){

			});


			modelInstance.code = taxi.code;
			modelInstance.dni = taxi.dni;
			modelInstance.name = taxi.name;
			modelInstance.lastName = taxi.lastName;
			modelInstance.carName = taxi.carName;
			modelInstance.carLicensePlate = taxi.carLicensePlate;
			modelInstance.phone = taxi.phone;
			modelInstance.email = taxi.email;

			next();
		})
    
	});



};
