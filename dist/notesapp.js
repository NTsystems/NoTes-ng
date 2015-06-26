(function () {
	'use strict';

	angular.module('app', [
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
		
	]);
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
			});
	}
})();

(function () {
	'use strict';

	angular.module('app.auth', []);
})();
(function () {
	'use strict'

	angular
		.module('app.auth')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$window', 'sessionData'];

	function LoginController($window, sessionData) {
		var vm = this;

		vm.loginTitle = "Sign In";

		vm.login = function () {
			var authUser = {
				username: vm.user.e_mail,
				token: "token",
			};

			sessionData.setCurrentUser(authUser);
			alert(authUser.username + " " + authUser.token + " " + sessionData.isLoggedIn() + " " + sessionData.getCurrentUser());
		};

	};

})();



(function () {
	'use strict';

	angular
		.module('app.auth')
		.controller('RegisterController', RegisterController);

	RegisterController.$inject = ['register', 'sessionData'];

	function RegisterController(register, sessionData) {
		var vm = this;
		vm.signup = 'Sign Up Now';
		
		vm.register = function () {
		    register.registerUser(vm.user.e_mail, vm.user.password);
		};


	};

	//$sessionStorage.setItem('e_mail', vm.user.e_mail);
	
})();
(function () {
	'use strict';
	
	angular
		.module('app.auth')
		.factory('register', register);

	register.$inject = ['$location'];

	function register($location) {
		var e_mail = '';
		var user = {};
		var service = {
			e_mail: e_mail,
			password: password,
			registerUser: registerUser,
		};
		return service;

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
			setCurrentUser: setCurrentUser,
			getCurrentUser: getCurrentUser,
			isLoggedIn: isLoggedIn,
		};

		return service;

		// Watch sessionStorage for new token
		$rootScope.$watch(function () {
			return sessionStorage.getItem('token');
		}, function (newVal, oldVal) {
			if(newVal){
				loggedIn = true;
				alert('logovan');
			} else {
				loggedIn = false;
			}
		}, true);

		function setCurrentUser(authUser) {
			user.username = authUser.username;
			user.token = authUser.token;
			loggedIn = true;
			sessionStorage.setItem('username', user.username);
			sessionStorage.setItem('token', user.token);
		};

		function getCurrentUser() {
			return isLoggedIn() ? user : null;
			alert(user.username);
		};

		function isLoggedIn() {
			return loggedIn;
		};
	}

})();
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
