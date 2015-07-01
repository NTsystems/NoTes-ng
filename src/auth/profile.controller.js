/**
* Profile Controller
* @namespace Controllers
*/
(function () {
	'use strict';

	angular
		.module('app.auth')
		.controller('ProfileController', ProfileController);

	ProfileController.$inject = [];

	function ProfileController() {
		var vm = this;
	};

})();