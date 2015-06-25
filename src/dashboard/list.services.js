(function () {
	'use strict';

	angular
		.module('app.notebook')
		.factory('listFactory', listFactory);

	function listFactory() {
		var notebooks = {};

		notebooks.list = [];

		return notebooks;

		function listNotebook(notebook) {
			notebooks.list.push({title: notebook});
		}

	}
})();