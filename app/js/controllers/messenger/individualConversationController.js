(function(){
    var module = angular.module("messaging-app");
    /**
     * @ngdoc controller
     * @name messaging-app.controller:IndividualConversationController
     * @requires messaging-app.service:MessengerService
     * @requires $timeout
     * @description Manages  ./views/messages/individual-conversation.html
     */
    module.controller("IndividualConversationController", IndividualConversationController);
    IndividualConversationController.$inject = ["MessengerService"];

    function IndividualConversationController(MessengerService) {
        // TODO add the sendMessage, deleteConversation functions. Uncomment as you add them.

        var vm = this;
        /**
         * @ngdoc property
         * @name messaging-app.controller:IndividualConversationController#conversation
         * @propertyOf messaging-app.controller:IndividualConversationController
         * @description Contains the current conversation in the page.
         */
        vm.conversation = {};
        /**
         * @ngdoc property
         * @name messaging-app.controller:IndividualConversationController#noMessages
         * @propertyOf messaging-app.controller:IndividualConversationController
         * @description Flag to display "No messages" in case of an empty conversation
         */
        vm.noMessages = true;
        /**
         * @ngdoc property
         * @name messaging-app.controller:IndividualConversationController#messageContent
         * @propertyOf messaging-app.controller:IndividualConversationController
         * @description Contains the new message contents
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
         * @description Initializes the controller
         */
        function initController() {
            vm.conversation = navi.getCurrentPage().options.conversation;
            vm.noMessages = (!(vm.conversation.messages && vm.conversation.messages.length > 0));
            //
        }
        /* Add your functions here*/
        /**
         * @ngdoc method
         * @name messaging-app.controller:IndividualConversationController#sendMessage
         * @methodOf messaging-app.controller:IndividualConversationController
         * @description Calls the MessengerService to add a message to the conversation array, updates vm.conversations
         *              after.
         */
        function sendMessage()
        {
            MessengerService.sendMessage(vm.messageContent,vm.conversation);
            vm.messageContent = "";
            vm.noMessages = false;
        }
        /**
         * @ngdoc method
         * @name messaging-app.controller:IndividualConversationController#deleteConversation
         * @methodOf messaging-app.controller:IndividualConversationController
         * @description Makes a call to {@link messaging-app.service:MessengerService#deleteConversation MessengerService} to
         *              delete the current conversation in the page, if this fails, it displays an alert
         *              otherwise, it pops the current page.
         */
        function deleteConversation(){
            MessengerService.deleteConversation(vm.conversation);
            navi.popPage();
        }
    }
})();