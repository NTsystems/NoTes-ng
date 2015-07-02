/**
* Profile Controller
* @namespace Controllers
*/
(function () {
	'use strict';

	angular
		.module('app.auth')
		.controller('ProfileController', ProfileController);

	ProfileController.$inject = ['$window', 'sessionData'];

	function ProfileController($window, sessionData) {
		var vm = this;

		/**
		* @name set value for current user
		*/
		if(sessionStorage.getItem('token')){
			vm.loggedIn = true;
			var user = sessionData.getCurrentUser();
			vm.e_mail = user.username;
		};
	};

})();