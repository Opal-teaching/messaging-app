(function(){
	var module = angular.module("messaging-app");
	module.controller("NewConversationController", NewConversationController);
	NewConversationController.$inject = ["MessengerService","UserService"];
	function NewConversationController(MessengerService,UserService){
		var vm = this;

		vm.checkFields = checkFields;
		vm.createConversation = createConversation; // Uncomment as you add code
		vm.imageUrl = "";
		vm.name = "";

		///////////////////////////////
		/* Add your functions here*/

		function checkFields(){
			if(vm.imageUrl==="" || vm.name===""){
				return true;
			}else{
				return false;
			}
		}

		function createConversation(){

			MessengerService.addConversation(vm.name,vm.imageUrl);

		}
	}
})();