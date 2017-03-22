/**
* taskDetail service Factory
* @namespace Factories
* @author Stefan Petkovic
*/
(function () {
    'use strict';

    angular
        .module('app.tasks')
        .factory('taskDetailService', taskDetailService);

    taskDetailService.$inject = ['$http', 'api_url', 'sessionData', '$stateParams', '$location'];

    function taskDetailService($http, api_url, sessionData, $stateParams, $location, $timeout) {

        var service = {
            getTaskDetails: getTaskDetails,
            getComments: getComments,
            updateTask: updateTask,
            postComment: postComment,
            deleteComment: deleteComment
        };

        return service;


        function getTaskDetails() {

            return $http.get(api_url + 'tasks/' + $stateParams.id + '/')
                .then(function(data, status, headers, config){
                    return data;
                })
                .catch(function(data, status, headers, config){
                    console.log("DATA STATUS: " + status);
                });
        }


       function getComments() {

            return $http.get(api_url + 'tasks/' + $stateParams.id + '/comments/')
                .then(function(data, status, headers, config){
                    return data;
                })
                .catch(function(data, status, headers, config){
                    if(status === undefined){
                        console.log("There are no comments!!!");
                    }else{
                        console.log("DATA STATUS: " + status);
                    }
                });
        }


        function updateTask(task) {

             $http.put(api_url + 'tasks/' + $stateParams.id + '/', {
                    'status' : task.status,
                    'percentage' : task.percentage
                })
                .then(taskUpdated)
                .catch(updateFailed);

            function taskUpdated(response) {
                //console.log('Response is: ', response);
                if(response !== null){
                    $location.path('task-details/'+$stateParams.id);
                }
            }

            function updateFailed(error) {
                console.log('Task update failed.', error);

            }
        }


        function postComment(comm, comments) {

            return $http.post(api_url + 'tasks/' + $stateParams.id + '/comments/', {
                    'text' : comm.text
                })
                .then(commPosted)
                .catch(postFailed);

            function commPosted(response) {
                console.log('Response is: ', response);
                if(response !== null){
                    comments.push(response.data);   // shows new comment without reloading the page
                    comments.text = "";             // clears textarea after post
                }
            }

            function postFailed(error) {
                console.log('Comment post failed.', error);
            }
        }


        function deleteComment(commid) {
            return $http.delete(api_url + 'tasks/' + $stateParams.id + '/comments/' + commid + '/');
        }
    }

})();
