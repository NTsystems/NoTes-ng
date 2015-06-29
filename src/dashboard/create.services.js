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