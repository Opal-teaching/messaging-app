(function(){
    'use strict';

    angular
        .module('messaging-app')
        .controller('IndividualConversationController', IndividualConversationController);

    IndividualConversationController.$inject = ["MessengerService"];

    function IndividualConversationController(MessengerService) {

        let vm = this;
        vm.conversation = {};
        vm.noMessages = true;
        vm.messageContent = "";

        // TODO: Implement the following functions (uncomment once implemented).
        // vm.sendMessage = sendMessage;
        // vm.deleteConversation = deleteConversation;

        activate();

        //////////////////////////////

        function activate() {
	        vm.conversation = navi.getCurrentPage().options.conversation;
	        vm.noMessages = (!(vm.conversation.messages && vm.conversation.messages.length > 0));
        }

        // TODO: Add your functions here.
    }
})();
