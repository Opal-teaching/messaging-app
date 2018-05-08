(function(){
    var module = angular.module("messaging-app");

    module.controller("IndividualConversationController", IndividualConversationController);
    IndividualConversationController.$inject = ["MessengerService"];

    function IndividualConversationController(MessengerService) {
    	// TODO add the sendMessage, deleteConversation functions. Uncomment as you add them.

        var vm = this;
        vm.conversation = {};
        vm.noMessages = true;
        vm.messageContent = "";
        // vm.sendMessage = sendMessage;
        // vm.deleteConversation = deleteConversation;

        initController();
        //////////////////////////

        function initController() {
	        // vm.conversation = navi.getCurrentPage().options.conversation;
	        // vm.noMessages = (!(vm.conversation.messages && vm.conversation.messages.length > 0));
	        //
        }
        /* Add your functions here*/
    }
})();