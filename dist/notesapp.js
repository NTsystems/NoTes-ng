(function () {
	'use strict';

	angular
		.module('app', [
		/*
		* Order is not important. Angular makes a pass to register
		* all of the modules listed and then when auth.app tries
		* to use auth.data, it's components are available.
		*/
		/*
		* Everybody has access to these.
		* We could place these under every feature area,
		* but this is easier to maintain.
		* 'auth.app'
		*/
		'ui.router',
		'app.auth',
		])
		.constant('api_url', 'http://192.168.85.5/api/');
})();
(function() {
	angular
		.module('app')
		.config(config);

	function config($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('home', {
		      url: "/",
		      views: {
		      	'header': {
		      		templateUrl: 'src/shared/header/header.html',
		      		controller: 'HeaderController',
		      		controllerAs: 'vm',
		      	},
		      	'footer': {
		      		templateUrl: 'src/shared/footer/footer.html'
		      	}
		      }
		    })
			.state('home.signup', {
				url: 'signup',
				views: {
					'content@': {
						templateUrl: 'src/auth/partials/register.view.html',
						controller: 'RegisterController',
						controllerAs: 'vm',
					}
				}
			})
			.state('home.signin', {
				url: 'signin',
				views: {
					'content@': {
						templateUrl: 'src/auth/partials/login.view.html',
						controller: 'LoginController',
						controllerAs: 'vm',
					}
				}
			})
			.state('home.profile', {
				url: 'profile',
				views: {
					'content@': {
						template: '<h2>Profil za update</h2>'
					}
				}
			});
	}
})();

(function () {
	'use strict';

	angular.module('app.auth', []);
})();
/**
* Login Controller
* @namespace Controllers
*/
(function () {
	'use strict'

	angular
		.module('app.auth')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$window', 'sessionData', '$location', 'loginservice'];

	function LoginController($window, sessionData, $location, loginservice) {
		var vm = this;

		vm.login = login;
		vm.loginTitle = "Sign In";

		/////////////////

		function login() {
			var authUser = {
				username: vm.user.e_mail,
				password: vm.user.password,
			};
			alert('Sending login data to server: '+ authUser.username + " " + authUser.password);

			return signInUser().then(function() {
				alert('O,o, something happened!');
			});

			function signInUser() {
				return loginservice.loginUser(authUser)
					.then(function(data){
						vm.user = data;
						$location.path('profile');
						sessionData.setCurrentUser(vm.user);
					})
			}
		};

		

	};

})();
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


/**
* Register Controller
* @namespace Controllers
*/
(function () {
	'use strict';

	angular
		.module('app.auth')
		.controller('RegisterController', RegisterController);

	RegisterController.$inject = ['registerservice', 'sessionData'];

	function RegisterController(registerservice, sessionData) {
		var vm = this;
		

		vm.register = register;
		vm.signup = 'Sign Up Now';
		
		//////////////////////////

		function register() {
		    registerservice.registerUser(vm.user.e_mail, vm.user.password);
		};


	};
	
})();
/**
* Register Factory
* @namespace Factories
*/
(function () {
	'use strict';
	
	angular
		.module('app.auth')
		.factory('registerservice', registerservice);

	registerservice.$inject = ['$location'];

	function registerservice($location) {
		var e_mail = '';
		var user = {};
		var service = {
			e_mail: e_mail,
			password: password,
			registerUser: registerUser,
		};
		return service;

		///////////////

		function registerUser(e_mail, password) {
			e_mail = e_mail;
			password = password;
			user.e_mail = e_mail;
			user.password = password;
			$location.path('/home/');
			alert(user.e_mail + " and " + user.password);
		};


	}

})();
/**
* SessionData Factory
* @namespace Factories
*/
(function () {
	'use strict';

	angular
		.module('app.auth')
		.factory('sessionData', sessionData);

	sessionData.$inject = ['$window', '$rootScope'];

	function sessionData($window, $rootScope) {
		var loggedIn = false;

		var user = {
			username: sessionStorage.getItem('username'),
			token: sessionStorage.getItem('token'),
		};

		var service = {
			getCurrentUser: getCurrentUser,
			removeCurrentUser: removeCurrentUser,
			setCurrentUser: setCurrentUser,
			isLoggedIn: isLoggedIn,
		};

		return service;

		///////////////

		function getCurrentUser() {
			return loggedIn ? user : null;
		};

		function removeCurrentUser() {
			user.username = null;
			user.token = null;
			sessionStorage.clear();
			loggedIn = false;
			alert('Not logged in anymore.' + isLoggedIn());
		};

		function setCurrentUser(authUser) {
			user.username = authUser.username;
			user.token = authUser.token;
			sessionStorage.setItem('username', user.username);
			sessionStorage.setItem('token', user.token);
			loggedIn = true;
		};

		function isLoggedIn() {
			return loggedIn;
		};
	}

})();
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
