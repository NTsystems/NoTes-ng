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