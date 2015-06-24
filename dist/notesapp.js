(function() {
	'user strict';

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
		'app.notebook',
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
			})
			.state("home.create-notebook",{
				url: "create-notebook",
				views: {
					"content@": {
						templateUrl: "src/dashboard/createNotebook.html",
						controller: "NbController",
						controllerAs: "vm",
					}
				}
			})
			.state("home.list-notebook",{
				url: "list-notebook",
				views: {
					"content@": {
						templateUrl: "src/dashboard/listNotebook.html",
						controller: "NbController",
						controllerAs: "vm",
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

	angular.module('app.notebook', []);
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

(function () {
	'use strict';

	angular
		.module('app.notebook')
		.controller('NbController', NbController);
		NbController.$inject = ['notebook'];

		function NbController(notebook) {
			var vm = this;
			vm.create = function (title) {
				if(title != '') {
					notebook.create(title);
				}
			}
		}
})();
(function () {
	'use strict';

	angular
		.module('app.notebook')
		.factory('notebook', notebook);

		function notebook() {
			var title = '';
			var names = {
				title: title,
				create: create,
			};

			return names;

			function create(title) {
				title = title;
				console.log(title);
			};
		};
})();  
