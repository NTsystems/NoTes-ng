/**
* Login service Factory
* @namespace Factories
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

		/**
		* @name loginUser
		* @param User's username&password
		*/
		function loginUser(authUser) {
			console.log(authUser);

			return $http.post(api_url+'tokens/', {
			 		'e_mail' : authUser.username,
			 		'password' : authUser.password,
			 	})
				.then(getTokenCompleted)
				.catch(getTokenFailed);


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