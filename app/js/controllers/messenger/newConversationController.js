(function(){
	var module = angular.module("messaging-app");
	module.controller("NewConversationController", NewConversationController);
	NewConversationController.$inject = ["MessengerService"];
	function NewConversationController(MessengerService){
		var vm = this;

        vm.checkFields = checkFields;
		vm.createConversation = createConversation;
		vm.imageUrl = "";
		vm.name = "";

		///////////////////////////////

		function createConversation() {
            MessengerService.addConversation(vm.imageUrl, vm.name);
            navi.popPage();
		}
		
		function checkFields() {
            return (vm.imageUrl === "" || vm.name === "");
        }
	}
})();