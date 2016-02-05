(function () {
    'use strict';

    angular
        .module('app.auth')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', 'api_url', 'sessionData'];

    function dataservice($http, api_url, sessionData) {

        var service = {
            getTasks: getTasks
        };

        return service;

        function getTasks() {

            var username = sessionStorage.getItem('username');

            return $http.get(api_url + 'tasks/' + username)

                .then(function(data, status, headers, config){
                    return data;
                })

                .catch(function(data, status, headers, config){
                    console.log("TOKEN: " + sessionStorage.getItem('token'));
                    console.log("DATA STATUS: " + status);
                });
        }
    }

})();
