(function () {
	'use strict';

	angular
		.module('app.auth')
		.factory('loginservice', loginservice);

	loginservice.$inject = ['$http'];

	function loginservice($http) {
		return {
			loginUser: loginUser,
		};

		/*
		* TO Do
		*/
		function loginUser() {
			return $http.post('')
				.then(getLoggedUser)
				.catch(getLogginFailed);

			function getLoggedUser(response) {
				return response.data.results;
			}

			function getLogginFailed(error) {
				alert(error.data);
			}
		}
	}

})();