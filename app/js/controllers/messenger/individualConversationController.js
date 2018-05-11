(function(){
    var module = angular.module("messaging-app");
    /**
     * @ngdoc controller
     * @name messaging-app.controller:IndividualConversationController
     * @requires messaging-app.service:MessengerService
     * @description Manages ./views/messages/individual-conversation.html.
     *              This page shows the conversation with another user, and allows messages to be sent to them.
     */
    module.controller("IndividualConversationController", IndividualConversationController);
    IndividualConversationController.$inject = ["MessengerService"];

    function IndividualConversationController(MessengerService) {

        // Add the sendMessage, deleteConversation functions. Uncomment as you add them.
        var vm = this;
        /**
         * @ngdoc property
         * @name messaging-app.controller:IndividualConversationController#conversation
         * @propertyOf messaging-app.controller:IndividualConversationController
         * @description Conversation currently being viewed.
         */
        vm.conversation = {};
        /**
         * @ngdoc property
         * @name messaging-app.controller:IndividualConversationController#noMessages
         * @propertyOf messaging-app.controller:IndividualConversationController
         * @description Flag to toggle "No messages" text if the conversation is empty.
         */
        vm.noMessages = true;
        /**
         * @ngdoc property
         * @name messaging-app.controller:IndividualConversationController#messageContent
         * @propertyOf messaging-app.controller:IndividualConversationController
         * @description Content of the message the user is typing.
         */
        vm.messageContent = "";
        vm.sendMessage = sendMessage;
        vm.deleteConversation = deleteConversation;

        initController();

        //////////////////////////
        /**
         * @ngdoc method
         * @name messaging-app.controller:IndividualConversationController#initController
         * @methodOf messaging-app.controller:IndividualConversationController
         * @description Initializes the controller and the scope variables.
         */
        function initController() {
	        vm.conversation = navi.getCurrentPage().options.convo;
	        vm.noMessages = !(vm.conversation && vm.conversation.messages && vm.conversation.messages.length > 0);
        }
        // TODO link
        /**
         * @ngdoc method
         * @name messaging-app.controller:IndividualConversationController#sendMessage
         * @methodOf messaging-app.controller:IndividualConversationController
         * @description Sends the typed message using {@link messaging-app.service:MessengerService#sendMessage
         *              MessengerService.sendMessage} and reloads the conversation.
         */
        function sendMessage() {
            var messageDate = new Date();
            MessengerService.sendMessage(vm.conversation, vm.messageContent, messageDate);

            // Empty out the message text box once the message is sent
            vm.messageContent = "";

            // Reload the conversations
            initController();
        }
        // TODO link
        /**
         * @ngdoc method
         * @name messaging-app.controller:IndividualConversationController#deleteConversation
         * @methodOf messaging-app.controller:IndividualConversationController
         * @description Deletes the current conversation using
         *              {@link messaging-app.service:MessengerService#deleteConversation
          *             MessengerService.deleteConversation}.
         */
        function deleteConversation() {
            // TODO check for failure
            MessengerService.deleteConversation(vm.conversation);

            // Go back to the conversations page
            navi.pushPage("./views/messages/conversations.html", { animation: "none" });
        }
    }
})();