/**
* Login Factory
* @namespace Factories
*/
(function () {
	'use strict';

	angular
		.module('app.auth')
		.factory('loginservice', loginservice);

	loginservice.$inject = ['$http', 'api_url'];

	function loginservice($http, api_url) {
		return {
			loginUser: loginUser,
		};

		/**
		* @name loginUser
		* @param User's username&password
		*/
		function loginUser(authUser) {
			var req = {
				method: 'POST',
			 	url: api_url + '/tokens/',
			 	headers: {
			 		'Content-Type': 'undefined',
			 		'Access-Control-Allow-Origin': '*',
			 	},
			 	data: {
			 		'username' : authUser.username,
			 		'password' : authUser.password,
			 	},
			};


			return $http.post(req)
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