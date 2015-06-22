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
		'ngCookies',
		'app.auth',
		
	]);
})();
(function() {
	angular
		.module('app')
		.config(config);

	function config($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('index', {
		      url: "/index",
		      template: "<h1>Test Notes</h1>"
		    })
			.state("signup", {
				url: "/signup",
				templateUrl: "src/auth/partials/auth.view.html",
				controller: 'AuthController',
				controllerAs: 'vm',
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

	AuthController.$inject = ['$cookies'];

	function AuthController($cookies) {
		var vm = this;
		vm.title = "Sign Up Now";
		var cookie = $cookies.get('e_mail');

		vm.register = function () {
			$cookies.put('e_mail', vm.user.e_mail);
		    alert(vm.user.e_mail);
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
	'use strict';

	angular
		.module('app')
		.controller('HeaderController', HeaderController);

	HeaderController.$inject = ['$cookies'];

	function HeaderController($cookies) {
		var vm = this;
		/**
		* to-do
		*/
	};
})();