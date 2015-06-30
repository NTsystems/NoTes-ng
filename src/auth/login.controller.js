/**
* Login Controller
* @namespace Controllers
*/
(function () {
	'use strict'

	angular
		.module('app.auth')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$window', 'sessionData', '$location', 'loginservice'];

	function LoginController($window, sessionData, $location, loginservice) {
		var vm = this;

		vm.login = login;
		vm.loginTitle = "Sign In";

		/////////////////

		function login() {
			var authUser = {
				username: vm.user.e_mail,
				password: vm.user.password,
			};
			alert('Sending login data to server: '+ authUser.username + " " + authUser.password);

			return signInUser().then(function() {
				alert('O,o, something happened!');
			});

			function signInUser() {
				return loginservice.loginUser(authUser)
					.then(function(data){
						vm.user = data;
						$location.path('profile');
						sessionData.setCurrentUser(vm.user);
					})
			}
		};

		

	};

})();