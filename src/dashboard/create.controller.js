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