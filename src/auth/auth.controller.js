(function () {
	'use strict';

	angular
		.module('app.auth')
		.controller('AuthController', AuthController);

	AuthController.$inject = ['$cookies'];

	function AuthController($cookies) {
		var vm = this;
		vm.title = "Sign Up Now";
		var cookie = $cookies.get('e_mail');

		vm.register = function () {
			$cookies.put('e_mail', vm.user.e_mail);
		    alert(vm.user.e_mail);
		};
	};
	
})();