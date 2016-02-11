/**
* TaskDetail Controller
* @namespace Controllers
* @author Stefan Petkovic
*/
(function () {
    'use strict';

    angular
        .module('app.tasks')
        .controller('TaskDetailController', TaskDetailController);

        TaskDetailController.$inject = ['taskDetailService', 'sessionData', '$scope'];


        function TaskDetailController(taskDetailService, sessionData, $stateParams, $scope) {

            var vm = this;

            vm.title = 'Task details';
            vm.postComment = postComment;
            vm.deleteComment = deleteComment;
            vm.update = update;
            vm.taskDetails = [];
            vm.comments = [];
            activate();

            function activate() {
                return getTaskDetails(), getComments();

            }

            function getTaskDetails(){
                return taskDetailService.getTaskDetails()
                .then(function(data){

                    vm.taskDetails = data.data;
                    vm.selectData = {
                        availableOptions: [
                          {id: 1, name: 'New'},
                          {id: 2, name: 'In progress'},
                          {id: 3, name: 'Done'},
                          {id: 4, name: 'Closed'}
                        ],
                        selectedOption: {id: vm.taskDetails.status} //This sets the default value of the select in the ui
                        };
                });
            }

            function getComments(){
                return taskDetailService.getComments()
                .then(function(data){
                    vm.comments = data.data;

                });
            }

            function update() {
                var task = {
                    'status': vm.selectData.selectedOption.id,
                    'percentage': vm.taskDetails.percentage,
                };

                return taskDetailService.updateTask(task);
            }

            function postComment() {
                var comm = {
                    'text': vm.comments.text
                };

                vm.comments.push(comm);

                return taskDetailService.postComment(comm);
            }

            function deleteComment(commid) {
                vm.comments.splice(vm.comments.indexOf(commid),1);
                return taskDetailService.deleteComment(commid);
            }
        }
})();
