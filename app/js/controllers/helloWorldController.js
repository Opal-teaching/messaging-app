(function(){
    var module = angular.module('<name-module>'); // Fetches the angular the module so that the controller can access it.

    module.controller("HelloWorldController",HelloWorldController); // Declares the component in the angular module


    HelloWorldController.$inject = []; // Injects the angular dependencies for this Controller



    function HelloWorldController(){ // function representing this controller, vm, is the equivalent of $scope
        var vm = this;
        // Create and attach hello_world variable to the vm object.

    }
)();
