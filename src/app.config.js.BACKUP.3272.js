<<<<<<< HEAD
// TO-DO
var app = angular.module('app', ['ngRoute']).confug(function($routeProvider) {
	$routeProvider.when('/notes', {
		temlateUrl: 'src/dashboard/notes.html',
		controller: ''
	})
	// body...
})
=======
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
>>>>>>> develop
