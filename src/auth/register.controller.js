/**
* Register Controller
* @namespace Controllers
* @author Olgica Djuric
*/
(function () {
	'use strict';

	angular
		.module('app.auth')
		.controller('RegisterController', RegisterController);

	RegisterController.$inject = ['registerservice', 'sessionData'];

	function RegisterController(registerservice, sessionData) {
		var vm = this;
		

		vm.register = register;
		vm.signup = 'Sign Up Now';
		
		//////////////////////////

		function register() {
			var regUser = {
				'username': vm.user.e_mail,
				'password': vm.user.password
			};
		    
		    return registerservice.registerUser(regUser);
		};


	};
	
})();