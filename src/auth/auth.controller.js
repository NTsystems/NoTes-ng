(function () {
	'use strict';

	angular
		.module('app.auth')
		.controller('AuthController', AuthController);

	AuthController.$inject = ['register'];

	function AuthController(register) {
		var vm = this;
		vm.title = 'Sign Up Now';
		vm.notes = 'NoTes - Your childhood is back!';
		
		vm.register = function () {
			//$sessionStorage.setItem('e_mail', vm.user.e_mail);
		    register.registerUser(vm.user.e_mail, vm.user.password);
		};


	};
	
})();