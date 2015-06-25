(function () {
	'use strict';
	
	angular
		.module('app.auth')
		.factory('register', register);

	register.$inject = ['$location'];

	function register($location) {
		var e_mail = '';
		var user = {};
		var service = {
			e_mail: e_mail,
			password: password,
			registerUser: registerUser,
		};
		return service;

		function registerUser(e_mail, password) {
			e_mail = e_mail;
			password = password;
			user.e_mail = e_mail;
			user.password = password;
			$location.path('/home/');
			alert(user.e_mail + " and " + user.password);
		};


	}

})();