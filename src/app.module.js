(function () {
	'use strict';

	angular
		.module('app', [
		/*
		* Order is not important. Angular makes a pass to register
		* all of the modules listed and then when auth.app tries
		* to use auth.data, it's components are available.
		*/
		/*
		* Everybody has access to these.
		* We could place these under every feature area,
		* but this is easier to maintain.
		*/
		'ui.router',
		'app.auth',
		'app.tasks'
		])
		.constant('api_url', 'http://127.0.0.1:8081/api/');
})();
