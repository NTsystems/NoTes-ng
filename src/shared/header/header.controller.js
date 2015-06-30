/**
* Header Controller
* @namespace Controllers
*/
(function () {
	'use strict';

	angular
		.module('app')
		.controller('HeaderController', HeaderController);

	HeaderController.$inject = ['$window', 'sessionData', '$rootScope'];

	function HeaderController($window, sessionData, $rootScope) {
		var vm = this;

		vm.currentUser = '';
		vm.loggedIn = sessionData.isLoggedIn();
		vm.logout = logout;
		vm.notes = 'NoTes - Your childhood is back!';

		/////////////////

		// watch the session storage for token
		$rootScope.$watch(function(){
				return sessionStorage.getItem('token');
			}, function(newVal, oldVal){
				if(newVal) {
					vm.loggedIn = sessionData.isLoggedIn();
					var user = sessionData.getCurrentUser();
					vm.currentUser = user.username;
				} else {
					vm.loggedIn = false;
				}
			}, true);

		// remove current user
		function logout() {
			alert("logout");
			sessionData.removeCurrentUser();
		};
	};
})();