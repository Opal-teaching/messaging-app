(function(){
    var module = angular.module("messaging-app");

    module.controller("IndividualConversationController", IndividualConversationController);
    IndividualConversationController.$inject = ["MessengerService", "UserService"];

    function IndividualConversationController(MessengerService, UserService) {

        // Add the sendMessage, deleteConversation functions. Uncomment as you add them.
        var vm = this;
        vm.conversation = {};
        vm.noMessages = true;
        vm.messageContent = "";
        vm.sendMessage = sendMessage;
        vm.deleteConversation = deleteConversation;

        initController();
        //////////////////////////

        function initController() {
	        vm.conversation = navi.getCurrentPage().options.convo;
	        vm.noMessages = !(vm.conversation && vm.conversation.messages && vm.conversation.messages.length > 0);
        }

        // Sends the typed message using the messenger service
        function sendMessage() {
            let messageDate = new Date();
            MessengerService.sendMessage(vm.conversation, vm.messageContent, messageDate);

            // Empty out the message text box once the message is sent
            vm.messageContent = "";

            // Reload the conversations
            initController();
        }

        // Deletes this conversation using the messenger service
        function deleteConversation() {
            MessengerService.deleteConversation(vm.conversation);

            // Go back to the conversations page
            navi.pushPage("./views/messages/conversations.html", { animation: "none" });
        }

    }
})();