/**
* Login service Factory
* @namespace Factories
* @author Olgica Djuric
*/
(function () {
	'use strict';

	angular
		.module('app.auth')
		.factory('loginservice', loginservice);

	loginservice.$inject = ['$http', 'api_url', 'sessionData', '$location'];

	function loginservice($http, api_url, sessionData, $location) {
		
		return {
			loginUser: loginUser,
		};


		/////////////////////////

		
		/**
		* @name loginUser
		* @param {JSON} user's e_mail&password
		*/
		function loginUser(authUser) {
			console.log(authUser);

			return $http.post(api_url + 'tokens/', {
			 		'e_mail' : authUser.username,
			 		'password' : authUser.password
			 	})
				.then(getTokenCompleted)
				.catch(getTokenFailed);

			/**
			* @name getTokenCompleted
			* @desc Login request successful
			* @returns {String}
			*/
			function getTokenCompleted(response) {
				console.log('Response is: ', response);
				if(response != null){
					authUser.token = response.data;
					sessionData.setCurrentUser(authUser);
					$location.path('profile');
				}
			};

			function getTokenFailed(error) {
				console.log('User sign in failed.', error);
			};

		}
	}

})();