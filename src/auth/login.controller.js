(function () {
	'use strict'

	angular
		.module('app.auth')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$window', 'sessionData'];

	function LoginController($window, sessionData) {
		var vm = this;

		vm.loginTitle = "Sign In";
		

		vm.login = function () {
			alert(vm.user.e_mail);
		};


	};

})();