(function () {
	'use strict';

	angular
		.module('app')
		.controller('HeaderController', HeaderController);

	HeaderController.$inject = ['$window', 'sessionData'];

	function HeaderController($window, sessionData) {
		var vm = this;
		vm.notes = 'NoTes - Your childhood is back!';

		vm.loggedIn = sessionData.isLoggedIn();

		alert(sessionData.isLoggedIn());

		/**
		* to-do
		*/
	};
})();