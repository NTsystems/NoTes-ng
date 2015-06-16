angular
	.module('app')
	.config(config);

function config($routeProvider){
	$routeProvider
		.when('/auth', {
			templateUrl: 'partials/authView.html',
			controller: 'Auth'
			controllerAs: 'vm',
			resolve: {
				authService: authService
			}
		});
}

function authService(authService){
	return authService.getUsers();
}