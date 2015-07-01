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