(function () {
	'use strict';

	/** 
	* Represents dataservice factory 
	* @factory
	*/
	angular
		.module('app.auth')
		.factory('dataservice', dataservice);

	dataservice.$inject = ['$http', 'logger'];

	/**
	* to-do dataservice
	*/
	function dataservice() {
		//to-do
	};

})();