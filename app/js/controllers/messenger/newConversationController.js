(function(){
	var module = angular.module("messaging-app");
	module.controller("NewConversationController", NewConversationController);
	NewConversationController.$inject = ["MessengerService"];
	function NewConversationController(MessengerService){
		var vm = this;

		// vm.checkFields = checkFields;
		vm.createConversation = createConversation; // Uncomment as you add code
		vm.imageUrl = "";
		vm.name = "";

		///////////////////////////////
		/* Add your functions here*/
		function createConversation(){
			c = {
                "id":MessengerService.generateId(),
                "imageUrl": vm.imageUrl,
                "lastMessage":{},
                "user_1":vm.name,
                "user_2":"David Herrera",
                "messages":[]
			};
            MessengerService.addConversation(c);
            navi.replacePage('./views/messages/individual-conversation.html',{'conversation':c});
		}
	}
})();