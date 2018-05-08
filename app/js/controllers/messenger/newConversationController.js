(function(){
	var module = angular.module("messaging-app");
	module.controller("NewConversationController", NewConversationController);
	NewConversationController.$inject = ["MessengerService"];
	function NewConversationController(MessengerService){
		var vm = this;

		vm.checkFields = checkFields;
		// vm.createConversation = createConversation; // Uncomment as you add code
		vm.imageUrl = "";
		vm.name = "";

		///////////////////////////////
		/* Add your functions here*/
	}
})();