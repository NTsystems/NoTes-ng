/**
* Register service Factory
* @namespace Factories
* @author Olgica Djuric
*/
(function () {
	'use strict';
	
	angular
		.module('app.auth')
		.factory('registerservice', registerservice);

	registerservice.$inject = ['api_url', '$location', '$http'];

	function registerservice(api_url, $location, $http) {

		return {
			registerUser: registerUser,
		};

		///////////////

		function registerUser(regUser) {
			console.log(regUser);

			return $http.post(api_url + 'users/', {
				'e_mail': regUser.username,
				'password': regUser.password
			})
			.then(getSignUpCompleted)
			.catch(getSignUpFailed);

			function getSignUpCompleted(response) {
				console.log('Sign Up successful. ', response);
				$location.path('/home/');
			};

			function getSignUpFailed(error) {
				console.log('Sign Up failed. ', error);
			};

		};
	}
})();