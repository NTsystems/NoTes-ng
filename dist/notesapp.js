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

		vm.login = login;
		vm.loginTitle = "Sign In";

		/////////////////

		function login() {
			var authUser = {
				username: vm.user.e_mail,
				token: "token1",
			};

			sessionData.setCurrentUser(authUser);
		};
	};

})();
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

		///////////////

		function setCurrentUser(authUser) {
			user.username = authUser.username;
			user.token = authUser.token;
			sessionStorage.setItem('username', user.username);
			sessionStorage.setItem('token', user.token);
		};

		function getCurrentUser(loggedIn) {
			return loggedIn ? user : null;
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
