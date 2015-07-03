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