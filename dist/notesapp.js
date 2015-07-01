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
	])
		.constant('api_url', 'http://192.168.85.5/api');
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
		      		// controller: 'AuthController',
		      		// controllerAs: 'vm',
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
						// controller: 'AuthController',
						// controllerAs: 'vm',
					}
				}
			})
			.state("home.create-notebook",{
				url: "notebooks",
				views: {
					"content@": {
						templateUrl: "src/dashboard/createNotebook.html",
						controller: "CreateController",
						controllerAs: "vm",
					}
				}
			})
			.state("home.list-notebook",{
				url: "notebooks",
				views: {
					"content@": {
						templateUrl: "src/dashboard/listNotebook.html",
						controller: "ListController",
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

	angular
		.module('app.notebook', []);
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
		.controller('CreateController', CreateController);

	CreateController.$inject = ['notebookFactory'];

	function CreateController(notebookFactory) {
		var vm = this;
		vm.createNotebook = createNotebook;
		vm.notebook = [];
		
		function createNotebook(title) {
		    notebookFactory.createTitle()
		    	.then(function(response) {
		    		vm.notebook = title;
		    	});
		};


	};
	
})();
(function () {
	'use strict';

	angular
		.module('app.notebook')
		.factory('notebookFactory', notebookFactory);

	notebookFactory.$inject = ['$http', 'api_url'];

	function notebookFactory($http, api) {
		var title = {
			getNotebooks: getNotebooks,
			createTitle: createTitle
		};

		return title;

		function getNotebooks() {
			return $http.get(api + '/notebooks', {
				headers: {
					'Authorization': 'Basic 57ec639cf65271e77174f6d6fb84d8afa6ca99df'
				}})
				.then(getNotebooksSuccess)
				.catch(getNotebooksError);

			function getNotebooksSuccess(response) {
				return response.data;
			}

			function getNotebooksError(error) {
				notebookFactory.error(error.data);
			}
		}

		function createTitle(title) {
			return $http.post(api + '/notebooks', title, {
				headers: {
					'Authorization': 'Basic 57ec639cf65271e77174f6d6fb84d8afa6ca99df'
				}})
				.then(createNotebook)
				.catch(createNotebookError);
			
			function createNotebook(response) {
				return response.data;
			}

			function createNotebookError(error) {
				//error
			}


		}
	}

})(); 
(function () {
	'use strict';

	angular
		.module('app.notebook')
		.controller('ListController', ListController);

	ListController.$inject = ['notebookFactory'];

	function ListController(notebookFactory) {
		var vm = this;
		vm.getNotebooks = [];

		function getAllNotebooks() {
			notebookFactory.getNotebooks()
			.then(function(data) {
				vm.getNotebooks = data;
				return vm.getNotebooks;
			});
		};


	};
	
})();
(function () {
	'use strict';

	angular
		.module('app.notebook')
		.factory('listFactory', listFactory);

	function listFactory() {
		var notebooks = {};

		notebooks.list = [];

		return notebooks;

		function listNotebook(notebook) {
			notebooks.list.push({title: notebook});
		}

	}
})();
