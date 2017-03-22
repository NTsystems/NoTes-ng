/**
* Profile Controller
* @namespace Controllers
* @author Olgica Djuric
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
		* @desc Sets value for current user
		*/
		if(sessionStorage.getItem('token')){
			vm.loggedIn = true;
			var user = sessionData.getCurrentUser();
			vm.e_mail = user.username;
		};
	};

})();