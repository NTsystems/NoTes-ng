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

		$stateProvider
			.state('index', {
		      url: "/index",
		      template: "<h1>Test Notes</h1>"
		    })
			.state("signup", {
				url: "/signup",
				templateUrl: "src/auth/partials/auth.view.html",
				controller: 'AuthCtrl',
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
		.controller('AuthCtrl', AuthCtrl);


	function AuthCtrl() {
		var vm = this;
		vm.title = "Sign Up Now";

		vm.register = function () {
		    alert(vm.user.e_mail);
		};
	}
})();

