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
				templateUrl: "src/auth/partials/auth.view.html"
			})
			.state("create-notebook", {
				url: "/create-notebook",
				templateUrl: "src/dashboard/createNotebook.html",
				controller: 'NbController'
			});
	}
})();
