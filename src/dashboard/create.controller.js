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