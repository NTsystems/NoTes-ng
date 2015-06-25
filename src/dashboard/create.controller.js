(function () {
	'use strict';

	angular
		.module('app.notebook')
		.controller('CreateController', CreateController);

	CreateController.$inject = ['createFactory'];

	function CreateController(createFactory) {
		var vm = this;
		
		vm.create = function () {
		    createFactory.createTitle(vm.title);
		};


	};
	
})();