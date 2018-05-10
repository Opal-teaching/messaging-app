(function(){
    var module = angular.module("messaging-app");

    module.controller("IndividualConversationController", IndividualConversationController);
    IndividualConversationController.$inject = ["MessengerService"];

    function IndividualConversationController(MessengerService) {
        var vm = this;
        vm.conversation = {};
        vm.noMessages = true;
        vm.messageContent = "";
        vm.sendMessage = sendMessage;
        vm.deleteConversation = deleteConversation;

        initController();
        //////////////////////////

        function initController() {
	        vm.conversation = navi.getCurrentPage().options.conversation;
	        vm.noMessages = (!(vm.conversation.messages && vm.conversation.messages.length > 0));
        }

        
        function sendMessage() {
            MessengerService.sendMessage(vm.conversation.id, vm.messageContent);
        }

        function deleteConversation() {
            MessengerService.deleteConversation(vm.conversation.id);
            navi.popPage();
        }
    }
})();