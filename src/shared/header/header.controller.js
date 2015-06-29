(function () {
	'use strict';

	angular
		.module('app')
		.controller('HeaderController', HeaderController);

	HeaderController.$inject = ['$window', 'sessionData', '$rootScope'];

	function HeaderController($window, sessionData, $rootScope) {
		var vm = this;


		vm.loggedIn = sessionData.isLoggedIn();
		vm.notes = 'NoTes - Your childhood is back!';

		/////////////////

		$rootScope.$watch(function(){
				return sessionStorage.getItem('token');
			}, function(newVal, oldVal){
				alert('Nova Vrednost: ' + newVal + " ,stara: " + oldVal);
				if(newVal!=oldVal) {
					vm.loggedIn = true;
					alert(vm.loggedIn + " " + oldVal);
					var us = sessionData.getCurrentUser(vm.loggedIn);
					alert('Ulogovan: ' + us.username);
				} else {
					vm.loggedIn = false;
					alert(vm.loggedIn);
				}
			},true);

	};
})();