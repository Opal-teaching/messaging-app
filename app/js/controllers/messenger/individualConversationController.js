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
        vm.sendMessage = sendMessage;
        vm.deleteConversation = deleteConversation;
        vm.confirmDelete = confirmDelete;

        initController();
        //////////////////////

        function initController() {
	        vm.conversation = navi.getCurrentPage().options.conversation;
	        vm.noMessages = (!(vm.conversation.messages && vm.conversation.messages.length > 0));
	        //
        }
        /* Add your functions here*/
        function sendMessage(){
            var d = new Date();
            var m = {
                'messageContent':vm.messageContent,
                'messageDate':d.toLocaleDateString("en-US",{month: 'short',
                    day: 'numeric',
                    year:'numeric',
                    hour:'2-digit',
                    minute:'2-digit'}),
                'messageId':parseInt(vm.conversation.lastMessage.messageId)+1+'',
                'from':vm.conversation.user_2
            };
            MessengerService.sendMessage(m, vm.conversation.id);
        }



        function deleteConversation(){
            MessengerService.deleteConversation(vm.conversation.id);
            navi.popPage();
        }


        function confirmDelete(){
            ons.notification.confirm({
                message: 'Delete this conversation?',
                callback: function(answer) {
                    if(answer){
                        deleteConversation();
                    }
                }
            });
        }

    }
})();