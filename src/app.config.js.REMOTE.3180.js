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
			});
	}
})();
