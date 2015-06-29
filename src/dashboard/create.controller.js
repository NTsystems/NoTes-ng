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