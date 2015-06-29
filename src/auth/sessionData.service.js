(function () {
	'use strict';

	angular
		.module('app.auth')
		.factory('sessionData', sessionData);

	sessionData.$inject = ['$window', '$rootScope'];

	function sessionData($window, $rootScope) {
		var loggedIn = false;

		var user = {
			username: sessionStorage.getItem('username'),
			token: sessionStorage.getItem('token'),
		};

		var service = {
			setCurrentUser: setCurrentUser,
			getCurrentUser: getCurrentUser,
			isLoggedIn: isLoggedIn,
		};

		return service;

		///////////////

		function setCurrentUser(authUser) {
			user.username = authUser.username;
			user.token = authUser.token;
			sessionStorage.setItem('username', user.username);
			sessionStorage.setItem('token', user.token);
		};

		function getCurrentUser(loggedIn) {
			return loggedIn ? user : null;
		};

		function isLoggedIn() {
			return loggedIn;
		};
	}

})();