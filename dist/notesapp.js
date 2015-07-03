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
		.constant('api_url', 'http://127.0.0.1:8081/api');
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
		
		function createNotebook() {
		    notebookFactory.createTitle(vm.name)
		    	.then(function(response) {
		    		vm.notebook = vm.name;
		    		alert(vm.notebook);
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
		var notebook = {
			getNotebooks: getNotebooks,
			createTitle: createTitle
		};

		return notebook;

		notebook.list = [];


		function getNotebooks() {
			return $http.get(api + '/notebooks/', {
				headers: {
					'Authorization': 'Token bbc7f7b5492468db6a4a54a00c1b504930371792'
				}})
				.then(getNotebooksSuccess)
				.catch(getNotebooksError);

			function getNotebooksSuccess(response) {
				notebook.list.push(response.data);
			}

			function getNotebooksError(error) {
				notebookFactory.error(error.data);
			}
		}

		function createTitle(name) {
			return $http.post(api + '/notebooks/', {'name': name}, {
				headers: {
					'Authorization': 'Token bbc7f7b5492468db6a4a54a00c1b504930371792'
				}})
				.then(createNotebook)
				.catch(createNotebookError);
			
			function createNotebook(response) {
				return response.data;
			}

			function createNotebookError(error) {
				return error.data;
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
		vm.getAllNotebooks = getAllNotebooks;

		function getAllNotebooks() {
			notebookFactory.getNotebooks()
				.then(function(response) {
					vm.notebooks = notebook.list;
					return vm.notebooks;
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
