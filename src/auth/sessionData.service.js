(function () {
	'use strict';

	angular
		.module('app.auth')
		.factory('sessionData', sessionData);

	sessionData.$inject = ['localStorageService'];

	function sessionData(localStorageService) {
		var service = {
			setCurrentUser: setCurrentUser,
			getCurrentUser: getCurrentUser,
		};

		return service;

		function setCurrentUser(e_mail) {
			localStorageService.set('e_mail', e_mail);
		};

		function getCurrentUser(key) {
			localStorageService.get(key);
		};
	}

})();