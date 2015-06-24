(function () {
	'use strict';

	angular
		.module('app.auth')
		.controller('RegisterController', RegisterController);

	RegisterController.$inject = ['register', 'sessionData'];

	function RegisterController(register, sessionData) {
		var vm = this;
		vm.signup = 'Sign Up Now';
		
		vm.register = function () {
			sessionData.setCurrentUser(vm.user.e_mail);
		    register.registerUser(vm.user.e_mail, vm.user.password);
		};


	};

	//$sessionStorage.setItem('e_mail', vm.user.e_mail);
	
})();