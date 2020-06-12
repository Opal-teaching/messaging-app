(function(){
    'use strict';

    angular
        .module('messaging-app')
        .controller('ConversationsController', ConversationsController);

    ConversationsController.$inject = ["MessengerService", "$scope"];

    function ConversationsController(MessengerService, $scope){

        let vm = this;
        vm.conversations = [];
        vm.noConversations = true;

        // TODO: Implement the following functions (uncomment once implemented).
        // vm.newConversation = newConversation;
        // vm.goToConversation = goToConversation;

        activate();

        //////////////////////////////

        function activate() {
            // Initialize the conversations
	        // vm.conversations = MessengerService.getConversations(); // TODO: Uncomment when ready.
            // vm.noConversations = (vm.conversations.length === 0); // TODO: Uncomment when ready.

	        // Initialize event listeners
            initializeEvents();
        }

        function initializeEvents() {
        	// This function registers an event listener to refresh the conversation list any time a page
            // is popped from the navigator, to keep them up to date.
	        navi.on("postpop",function(event) {
	            $timeout(function() {
	                // vm.conversations = MessengerService.getConversations(); // TODO: Uncomment when ready.
                    // vm.noConversations = (vm.conversations.length === 0); // TODO: Uncomment when ready.
                });
	        });
        }

        // TODO: Add your functions here.

		// Removes the postpop event listener defined above when the scope is destroyed.
        $scope.$on('$destroy', function() {
		    navi.off("postpop");
	    });
    }
})();
