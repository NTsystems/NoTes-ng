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