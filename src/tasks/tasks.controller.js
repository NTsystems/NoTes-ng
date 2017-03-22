(function () {
    'use strict';

    angular
        .module('app.tasks')
        .controller('TasksController', TasksController)

        TasksController.$inject = ['dataservice', 'sessionData'];


        function TasksController(dataservice, sessionData) {

            var vm = this;

            vm.title = 'Tasks';
            vm.getTasks = getTasks;
            vm.isActive = isActive;
            vm.tasks = [];
            var user = sessionData.getCurrentUser();
            vm.e_mail = user.username;
            activate();

            function activate() {
                return getTasks();
            }

            function getTasks(){
                return dataservice.getTasks()
                .then(function(data){
                    vm.tasks = data.data;
                });
            }

            function isActive(task) {
                return !!(vm.selectedTask === task);
            }



        }
})();
