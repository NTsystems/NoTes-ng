/**
* Register Controller
* @namespace Controllers
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
		    registerservice.registerUser(vm.user.e_mail, vm.user.password);
		};


	};
	
})();