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