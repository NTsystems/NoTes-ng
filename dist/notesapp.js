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
		.controller('CreateController', CreateController);

	CreateController.$inject = ['notebookFactory'];

	function CreateController(notebookFactory) {
		var vm = this;
		vm.name = [];
		
		function create() {
		    vm.create = notebookFactory.createTitle(title)
		    	.then(function(name) {
		    		vm.name.push(name);
		    	});

		};


	};
	
})();
(function () {
	'use strict';

	angular
		.module('app.notebook')
		.factory('notebookFactory', notebookFactory);

	notebookFactory.$inject = ['$http', '$q'];

	function notebookFactory($http, $q) {
		var url = 'http://192.168.85.5:8000/api';
		var title = {
			getAllNotebooks: getAllNotebooks,
			createTitle: createTitle
		};

		return title;

		function getAllNotebooks() {
			var defer = $q.defer();
			$http.get(url + '/notebooks')
			.success(function(response){
				defer.resolve(response);
			})
			.error(function(error, status){
				defer.reject(error);
			})

			return defer.promise;
		}

		function createTitle(title) {
			var defer = $q.defer();
			$http.post(url + '/notebooks', title)
			.success(function(response){
				defer.resolve(response);
			})
			.error(function(error, status){
				defer.reject(error);
			})

			return defer.promise;
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
		
		function list() {
		    vm.list = notebookFactory.notebook.push(title);
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
