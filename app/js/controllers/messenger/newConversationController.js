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

		// Check the imageUrl and name fields
		function checkFields() {
			// TODO check that the image is a valid image
			return ((vm.imageUrl.length > 0) && (vm.name.length > 0));
		}

		function createConversation(otherUser, imageUrl) {

            MessengerService.addConversation(otherUser, imageUrl);

            // Go back to the conversations page
            navi.pushPage("./views/messages/conversations.html", { animation: "none" });
		}

	}
})();