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
		      		controller: 'AuthController',
		      		controllerAs: 'vm',
		      	},
		      	'footer': {
		      		templateUrl: 'src/shared/footer/footer.html'
		      	}
		      }
		    })
			.state("home.signup", {
				url: "signup",
				views: {
					'content@': {
						templateUrl: "src/auth/partials/auth.view.html",
						controller: 'AuthController',
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
	'use strict';

	angular
		.module('app.auth')
		.controller('AuthController', AuthController);

	AuthController.$inject = ['register'];

	function AuthController(register) {
		var vm = this;
		vm.title = 'Sign Up Now';
		vm.notes = 'NoTes - Your childhood is back!';
		
		vm.register = function () {
			//$sessionStorage.setItem('e_mail', vm.user.e_mail);
		    register.registerUser(vm.user.e_mail, vm.user.password);
		};


	};
	
})();
(function () {
	'use strict';

	/** 
	* Represents dataservice factory 
	* @factory
	*/
	angular
		.module('app.auth')
		.factory('dataservice', dataservice);

	dataservice.$inject = ['$http', 'logger'];

	/**
	* to-do dataservice
	*/
	function dataservice() {
		//to-do
	};

})();
(function () {
	angular
		.module('app.auth')
		.factory('register', register);

	function register() {
		var e_mail = '';
		var password = '';
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
			alert(user.e_mail + " and " + user.password);
			console.log(user.e_mail);
		};


	}

})();
(function () {
	'use strict';

	angular
		.module('app')
		.controller('HeaderController', HeaderController);

	HeaderController.$inject = ['register'];

	function HeaderController(register) {
		var vm = this;
		/**
		* to-do
		*/
	};
})();