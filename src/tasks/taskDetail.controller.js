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

        TaskDetailController.$inject = ['taskDetailService', 'sessionData', '$timeout'];


        function TaskDetailController(taskDetailService, sessionData, $timeout) {

            var vm = this;

            vm.title = 'Task details';
            vm.postComment = postComment;
            vm.deleteComment = deleteComment;
            vm.update = updateTask;
            vm.taskDetails = [];
            vm.comments = [];

            vm.successMessage = false;

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
                          {id: 3, name: 'Done'}
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


            function updateTask() {
                var task =
                    {
                    'status': vm.selectData.selectedOption.id,
                    'percentage': vm.taskDetails.percentage,
                    };

                vm.successMessage = true;
                $timeout(function () { vm.successMessage = false;}, 2000);

                taskDetailService.updateTask(task);
            }


            function postComment() {
                var comm = {
                    'text': vm.comments.text
                };
                taskDetailService.postComment(comm,vm.comments);
            }


            function deleteComment(commid) {
                var iter = 0;
                for(var i in vm.comments){
                    if(commid === vm.comments[i].id){
                        vm.comments.splice(iter,1);     // removes deleted comment from comment list
                    }
                    iter += 1;
                }
                taskDetailService.deleteComment(commid);
            }
        }
})();
