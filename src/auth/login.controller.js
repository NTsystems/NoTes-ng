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
			var authUser = {
				username: vm.user.e_mail,
				token: "token",
			};

			sessionData.setCurrentUser(authUser);
			alert(authUser.username + " " + authUser.token + " " + sessionData.isLoggedIn() + " " + sessionData.getCurrentUser());
		};

	};

})();