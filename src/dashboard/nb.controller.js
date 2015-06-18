(function () {
	'use strict';

	angular
		.module('app.notebook')
		.controller('NbController', NbController);

		function NbController() {
			var vm = this;
			vm.title = 'Create Notebook'
		}
})();