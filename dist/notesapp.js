(function () {
	'use strict';

	angular
		.module('app', [
		/*
		* Order is not important. Angular makes a pass to register
		* all of the modules listed and then when auth.app tries
		* to use auth.data, it's components are available.
		*/
		/*
		* Everybody has access to these.
		* We could place these under every feature area,
		* but this is easier to maintain.
		*/
		'ui.router',
		'app.auth',
		'app.tasks'
		])
		.constant('api_url', 'http://127.0.0.1:8081/api/');
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

(function () {
	'use strict';

	angular.module('app.tasks',[]);
})();

(function () {
	'use strict';

	angular.module('app.auth',[]);
})();

/**
* Login Controller
* @namespace Controllers
* @author Olgica Djuric
*/
(function () {
	'use strict'

	angular
		.module('app.auth')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$window', 'sessionData', '$location', 'loginservice'];

	function LoginController($window, sessionData, $location, loginservice) {
		var vm = this;

		vm.login = login;
		vm.loginTitle = "Sign In";

		/////////////////

		function login() {
			var authUser = {
				username: vm.user.e_mail,
				password: vm.user.password,
			};

			return loginservice.loginUser(authUser);
		};



	};

})();

/**
* Login service Factory
* @namespace Factories
* @author Olgica Djuric
*/
(function () {
	'use strict';

	angular
		.module('app.auth')
		.factory('loginservice', loginservice);

	loginservice.$inject = ['$http', 'api_url', 'sessionData', '$location'];

	function loginservice($http, api_url, sessionData, $location) {

		return {
			loginUser: loginUser,
		};


		/////////////////////////


		/**
		* @name loginUser
		* @param {JSON} user's e_mail&password
		*/
		function loginUser(authUser) {
			console.log(authUser);

			return $http.post(api_url + 'tokens/', {
			 		'e_mail' : authUser.username,
			 		'password' : authUser.password
			 	})
				.then(getTokenCompleted)
				.catch(getTokenFailed);

			/**
			* @name getTokenCompleted
			* @desc Login request successful
			* @returns {String}
			*/
			function getTokenCompleted(response) {
				console.log('Response is: ', response);
				if(response != null){
					authUser.token = response.data;
					sessionData.setCurrentUser(authUser);
					$location.path('tasks');
				}
			};

			function getTokenFailed(error) {
				console.log('User sign in failed.', error);
			};

		}
	}

})();

/**
* Profile Controller
* @namespace Controllers
* @author Olgica Djuric
*/
(function () {
	'use strict';

	angular
		.module('app.auth')
		.controller('ProfileController', ProfileController);

	ProfileController.$inject = ['$window', 'sessionData'];

	function ProfileController($window, sessionData) {
		var vm = this;

		/**
		* @desc Sets value for current user
		*/
		if(sessionStorage.getItem('token')){
			vm.loggedIn = true;
			var user = sessionData.getCurrentUser();
			vm.e_mail = user.username;
		};
	};

})();

/**
* Register Controller
* @namespace Controllers
* @author Olgica Djuric
*/
(function () {
	'use strict';

	angular
		.module('app.auth')
		.controller('RegisterController', RegisterController);

	RegisterController.$inject = ['registerservice', 'sessionData'];

	function RegisterController(registerservice, sessionData) {
		var vm = this;
		

		vm.register = register;
		vm.signup = 'Sign Up Now';
		
		//////////////////////////

		function register() {
			var regUser = {
				'username': vm.user.e_mail,
				'password': vm.user.password
			};
		    
		    return registerservice.registerUser(regUser);
		};


	};
	
})();
/**
* Register service Factory
* @namespace Factories
* @author Olgica Djuric
*/
(function () {
	'use strict';
	
	angular
		.module('app.auth')
		.factory('registerservice', registerservice);

	registerservice.$inject = ['api_url', '$location', '$http'];

	function registerservice(api_url, $location, $http) {

		return {
			registerUser: registerUser,
		};

		///////////////

		function registerUser(regUser) {
			console.log(regUser);

			return $http.post(api_url + 'users/', {
				'e_mail': regUser.username,
				'password': regUser.password
			})
			.then(getSignUpCompleted)
			.catch(getSignUpFailed);

			function getSignUpCompleted(response) {
				console.log('Sign Up successful. ', response);
				$location.path('/home/');
			};

			function getSignUpFailed(error) {
				console.log('Sign Up failed. ', error);
			};

		};
	}
})();
/**
* SessionData service Factory
* @namespace Factories
* @author Olgica Djuric
*/
(function () {
	'use strict';

	angular
		.module('app.auth')
		.factory('sessionData', sessionData);

	sessionData.$inject = ['$window', '$rootScope'];

	function sessionData($window, $rootScope) {
		var user = {
			username: sessionStorage.getItem('username'),
			token: sessionStorage.getItem('token'),
		};

		var service = {
			getCurrentUser: getCurrentUser,
			removeCurrentUser: removeCurrentUser,
			setCurrentUser: setCurrentUser,
			//isLoggedIn: isLoggedIn,
		};

		return service;

		///////////////

		function getCurrentUser() {
			return sessionStorage.getItem('token') ? user : null;
		};

		function removeCurrentUser() {
			user.username = null;
			user.token = null;
			sessionStorage.clear();
		};

		function setCurrentUser(authUser) {
			user.username = authUser.username;
			user.token = authUser.token;
			user.id = authUser.id;
			sessionStorage.setItem('username', user.username);
			sessionStorage.setItem('token', user.token);
		};

//		function isLoggedIn() {
//			return loggedIn;
//		};
	}

})();

/**
* TaskDetail Controller
* @namespace Controllers
* @author Stefan Petkovic
*/
(function () {
    'use strict';

    angular
        .module('app.tasks')
        .controller('TaskDetailController', TaskDetailController);

        TaskDetailController.$inject = ['taskDetailService', 'sessionData', '$scope'];


        function TaskDetailController(taskDetailService, sessionData, $stateParams, $scope) {

            var vm = this;

            vm.title = 'Task details';
            vm.postComment = postComment;
            vm.deleteComment = deleteComment;
            vm.update = update;
            vm.taskDetails = [];
            vm.comments = [];
            activate();

            function activate() {
                return getTaskDetails(), getComments();

            }

            function getTaskDetails(){
                return taskDetailService.getTaskDetails()
                .then(function(data){

                    vm.taskDetails = data.data;
                    vm.selectData = {
                        availableOptions: [
                          {id: 1, name: 'New'},
                          {id: 2, name: 'In progress'},
                          {id: 3, name: 'Done'},
                          {id: 4, name: 'Closed'}
                        ],
                        selectedOption: {id: vm.taskDetails.status} //This sets the default value of the select in the ui
                        };
                });
            }

            function getComments(){
                return taskDetailService.getComments()
                .then(function(data){
                    vm.comments = data.data;

                });
            }

            function update() {
                var task = {
                    'status': vm.selectData.selectedOption.id,
                    'percentage': vm.taskDetails.percentage,
                };

                return taskDetailService.updateTask(task);
            }

            function postComment() {
                var comm = {
                    'text': vm.comments.text
                };

                vm.comments.push(comm);

                return taskDetailService.postComment(comm);
            }

            function deleteComment(commid) {
                vm.comments.splice(vm.comments.indexOf(commid),1);
                return taskDetailService.deleteComment(commid);
            }
        }
})();

/**
* taskDetail service Factory
* @namespace Factories
* @author Stefan Petkovic
*/
(function () {
    'use strict';

    angular
        .module('app.tasks')
        .factory('taskDetailService', taskDetailService);

    taskDetailService.$inject = ['$http', 'api_url', 'sessionData', '$stateParams', '$location'];

    function taskDetailService($http, api_url, sessionData, $stateParams, $location) {

        var service = {
            getTaskDetails: getTaskDetails,
            getComments: getComments,
            updateTask: updateTask,
            postComment: postComment,
            deleteComment: deleteComment
        };

        return service;

        function getTaskDetails() {

            return $http.get(api_url + 'tasks/' + $stateParams.id + '/')
                .then(function(data, status, headers, config){
                    return data;
                })
                .catch(function(data, status, headers, config){
                    console.log("DATA STATUS: " + status);
                });
        }

       function getComments() {

            return $http.get(api_url + 'tasks/' + $stateParams.id + '/comments/')
                .then(function(data, status, headers, config){
                    return data;
                })
                .catch(function(data, status, headers, config){
                    if(status === undefined){
                        console.log("There are no comments");
                    }else{
                        console.log("DATA STATUS: " + status);
                    }
                });
        }


        function updateTask(task) {
            console.log("Task status: " + task.status);
            console.log("Task percentage: " + task.percentage);
            return $http.put(api_url + 'tasks/' + $stateParams.id + '/', {
                    'status' : task.status,
                    'percentage' : task.percentage
                })
                .then(taskUpdated)
                .catch(updateFailed);

            function taskUpdated(response) {
                console.log('Response is: ', response);
                if(response !== null){
                    $location.path('tasks');
                }
            }

            function updateFailed(error) {
                console.log('Task update failed.', error);

            }
        }

        function postComment(comm) {
            console.log("Comment text: " + comm.text);
            return $http.post(api_url + 'tasks/' + $stateParams.id + '/comments/', {
                    'text' : comm.text
                })
                .then(commPosted)
                .catch(postFailed);

            function commPosted(response) {
                console.log('Response is: ', response);
                if(response !== null){
                    $location.path('task-details/'+$stateParams.id);

                }
            }

            function postFailed(error) {
                console.log('Comment post failed.', error);

            }
        }

        function deleteComment(commid) {
            console.log("Comment id: " + commid);
            return $http.delete(api_url + 'tasks/' + $stateParams.id + '/comments/' + commid + '/')
                .then(commDeleted)
                .catch(deleteFailed);

            function commDeleted(response) {
                console.log('Response is: ', response);
                if(response !== null){
                    getComments();
                    $location.path('task-details/'+$stateParams.id);

                }
            }

            function deleteFailed(error) {
                console.log('Comment delete failed.', error);

            }
        }
    }

})();

(function () {
    'use strict';

    angular
        .module('app.tasks')
        .controller('TasksController', TasksController)

        TasksController.$inject = ['dataservice', 'sessionData'];


        function TasksController(dataservice, sessionData) {

            var vm = this;

            vm.title = 'Tasks';
            vm.getTasks = getTasks;
            vm.isActive = isActive;
            vm.tasks = [];
            var user = sessionData.getCurrentUser();
            vm.e_mail = user.username;
            activate();

            function activate() {
                return getTasks();
            }

            function getTasks(){
                return dataservice.getTasks()
                .then(function(data){
                    vm.tasks = data.data;
                });
            }

            function isActive(task) {
                return !!(vm.selectedTask === task);
            }



        }
})();

(function () {
    'use strict';

    angular
        .module('app.tasks')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', 'api_url', 'sessionData'];

    function dataservice($http, api_url, sessionData) {

        var service = {
            getTasks: getTasks
        };

        return service;

        function getTasks() {

            var username = sessionStorage.getItem('username');

            return $http.get(api_url + 'tasks/' + username + '/')

                .then(function(data, status, headers, config){
                    return data;
                })

                .catch(function(data, status, headers, config){
                    console.log("TOKEN: " + sessionStorage.getItem('token'));
                    console.log("DATA STATUS: " + status);
                });
        }
    }

})();

/**
* Header Controller
* @namespace Controllers
*/
(function () {
	'use strict';

	angular
		.module('app')
		.controller('HeaderController', HeaderController);

	HeaderController.$inject = ['$window', 'sessionData', '$rootScope', '$location'];

	function HeaderController($window, sessionData, $rootScope, $location) {
		var vm = this;

		if(sessionStorage.getItem('token')){
			vm.currentUser = sessionData.getCurrentUser();
			vm.loggedIn = true;
		}
		vm.logout = logout;
		vm.notes = 'NoTes - Your childhood is back!';

		/////////////////


		/**
		* @name Watch the session storage for token
		* @param Token from session storage
		*/
		$rootScope.$watch(function(){
				return sessionStorage.getItem('token');
			}, function(newVal, oldVal){
				console.log(newVal, oldVal);
				if(newVal) {
					var user = sessionData.getCurrentUser();
					console.log(user);
					if(user != null) {
						vm.currentUser = user.username;
						vm.loggedIn = true;
					}
				} else {
					vm.loggedIn = false;
					console.log('Login status is false.');
				}
			}, true);


		// remove current user
		function logout() {

			sessionData.removeCurrentUser();
		};
	};
})();

