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
		      	},
		      	'content@': {
						templateUrl: 'src/auth/partials/login.view.html',
						controller: 'LoginController',
						controllerAs: 'vm',
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
			})
			.state('home.profile', {
				url: 'profile',
				views: {
					'content@': {
						templateUrl: 'src/auth/partials/profile.view.html',
						controller: 'ProfileController',
						controllerAs: 'vm',
					}
				}
			})
			.state('home.tasks', {
				url: 'tasks',
				views: {
					'content@': {
						templateUrl: 'src/tasks/partials/tasks.html',
						controller: 'TasksController',
						controllerAs: 'vm',
					}
				}
			})
			.state('home.task-details', {
				url: 'task-details/:id',
				views: {
					'content@': {
						templateUrl: 'src/tasks/partials/task-details.html',
						controller: 'TaskDetailController',
						controllerAs: 'vm',
					}
				}
			});
	}
})();
