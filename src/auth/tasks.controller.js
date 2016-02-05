(function () {
    'use strict';

    angular
        .module('app.auth')
        .controller('TasksController', TasksController)

        TasksController.$inject = ['dataservice', 'sessionData'];


        function TasksController(dataservice, sessionData) {

            var vm = this;

            vm.title = 'Tasks';
            vm.getTasks = getTasks;
            vm.isActive = isActive;
            vm.tasks = [];



            activate();

            function activate() {
                return getTasks();
            }

            function getTasks(){
                return dataservice.getTasks()
                    .then(function(data){

                        vm.tasks = data.data;

                        // var i;
                        // for(i in vm.tasks){
                        //     console.log(vm.tasks[i])
                        // }

                        // var user = sessionData.getCurrentUser();
                        // console.log("Id: " + user.id + " | " + "Username: " + user.username);

                    });
            }

            function isActive(task) {
                return !!(vm.selectedTask === task);
            }



        }
})();
