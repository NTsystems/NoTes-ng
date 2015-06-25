(function () {
	'use strict';

	angular
		.module('app.notebook')
		.controller('ListController', ListController);

	ListController.$inject = ['ListFactory'];

	function ListController(ListFactory) {
		var vm = this;
		
		vm.list = function() {
		    ListFactory.notebook(title);
		};


	};
	
})();