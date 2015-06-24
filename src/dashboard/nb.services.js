(function () {
	'use strict';

	angular
		.module('app.notebook')
		.factory('createFactory', createFactory);

		function createFactory() {
			var title = '';
			var names = {
				title: title,
				create: create,
			};

			return names;

			function create(title) {
				title = title;
				console.log(title);
			};
		};
})();  