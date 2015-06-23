(function () {
	angular
		.module('app.auth')
		.factory('register', register);

	function register() {
		var e_mail = '';
		var password = '';
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
			alert(user.e_mail + " and " + user.password);
		};


	}

})();