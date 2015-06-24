(function () {
	'use strict';

	angular
		.module('app.notebook')
		.controller('NbController', NbController);
		NbController.$inject = ['createFactory'];

		function NbController(createFactory) {
			var vm = this;
			vm.create = function (title) {
				if(title != '') {
					createFactory.create(title);
				}
			}
		}
})();