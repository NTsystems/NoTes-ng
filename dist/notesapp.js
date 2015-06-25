(function() {
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
		'LocalStorageModule',
		
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
			alert(vm.user.e_mail);
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
			sessionData.setCurrentUser(vm.user.e_mail);
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
			$location.path("'http://192.168.85.5:8000/api/users/'");
			alert(user.e_mail + " and " + user.password);
		};


	}

})();
(function () {
	'use strict';

	angular
		.module('app.auth')
		.factory('sessionData', sessionData);

	sessionData.$inject = ['localStorageService'];

	function sessionData(localStorageService) {
		var service = {
			setCurrentUser: setCurrentUser,
			getCurrentUser: getCurrentUser,
		};

		return service;

		function setCurrentUser(e_mail) {
			localStorageService.set('e_mail', e_mail);
		};

		function getCurrentUser(key) {
			localStorageService.get(key);
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
		/**
		* to-do
		*/
	};
})();