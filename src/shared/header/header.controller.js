/**
* Header Controller
* @namespace Controllers
*/
(function () {
	'use strict';

	angular
		.module('app')
		.controller('HeaderController', HeaderController);

	HeaderController.$inject = ['$window', 'sessionData', '$rootScope', '$location'];

	function HeaderController($window, sessionData, $rootScope, $location) {
		var vm = this;

		if(sessionStorage.getItem('token')){
			vm.currentUser = sessionData.getCurrentUser();
			vm.loggedIn = true;
		}
		vm.logout = logout;
		vm.notes = 'NoTes - Your childhood is back!';

		/////////////////


		/**
		* @name Watch the session storage for token
		* @param Token from session storage
		*/
		$rootScope.$watch(function(){
				return sessionStorage.getItem('token');
			}, function(newVal, oldVal){
				console.log(newVal, oldVal);
				if(newVal) {
					var user = sessionData.getCurrentUser();
					console.log(user);
					if(user != null) {
						vm.currentUser = user.username;
						vm.loggedIn = true;
					}
				} else {
					vm.loggedIn = false;
					console.log('Login status is false.');
				}
			}, true);


		// remove current user
		function logout() {

			sessionData.removeCurrentUser();
		};
	};
})();
