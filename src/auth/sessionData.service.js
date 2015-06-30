/**
* SessionData Factory
* @namespace Factories
*/
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
			getCurrentUser: getCurrentUser,
			removeCurrentUser: removeCurrentUser,
			setCurrentUser: setCurrentUser,
			isLoggedIn: isLoggedIn,
		};

		return service;

		///////////////

		function getCurrentUser() {
			return loggedIn ? user : null;
		};

		function removeCurrentUser() {
			user.username = null;
			user.token = null;
			sessionStorage.clear();
			loggedIn = false;
			alert('Not logged in anymore.' + isLoggedIn());
		};

		function setCurrentUser(authUser) {
			user.username = authUser.username;
			user.token = authUser.token;
			sessionStorage.setItem('username', user.username);
			sessionStorage.setItem('token', user.token);
			loggedIn = true;
		};

		function isLoggedIn() {
			return loggedIn;
		};
	}

})();