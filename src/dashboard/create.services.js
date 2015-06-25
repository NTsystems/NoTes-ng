(function () {
	'use strict';

	angular
		.module('app.notebook')
		.factory('createFactory', createFactory);

	function createFactory() {
		var name = '';
		var title = {
			name: name,
			createTitle: createTitle,
		};
		return title;

		function createTitle(title) {
			title = title;
			console.log(title);
		};


	}

})(); 