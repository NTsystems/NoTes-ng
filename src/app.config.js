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
						controller: "CreateController",
						controllerAs: "vm",
					}
				}
			})
			.state("home.list-notebook",{
				url: "list-notebook",
				views: {
					"content@": {
						templateUrl: "src/dashboard/listNotebook.html",
						controller: "CreateController",
						controllerAs: "vm",
					}
				}
			});
	}
})();
