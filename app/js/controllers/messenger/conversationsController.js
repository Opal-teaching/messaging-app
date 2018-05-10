(function(){
    var module = angular.module('messaging-app');

    module.controller('ConversationsController', ConversationsController);

    ConversationsController.$inject = ["MessengerService", "$scope", "$timeout"];
    function ConversationsController(MessengerService, $scope, $timeout){

    	// Implement the following functions and a view
        var vm = this;
        vm.conversations = [];
        vm.newConversation = newConversation;
        vm.goToConversation = goToConversation;
        vm.emptyConversations = true;
        initController();

        ////////////////////////////////////////////
        function initController(){

	        vm.conversations = MessengerService.getConversations();
	        vm.emptyConversations = (vm.conversations.length === 0);

	        // Initialize events

            initializeEvents();

        }

        function initializeEvents() {
        	// This function refreshes your conversation list any time you pop a page so to keep them up to date.
	        // We will go over events later.
	        navi.on("postpop",function(event){
	            $timeout(function(){
		           vm.conversations = MessengerService.getConversations(); //uncomment when ready
		           vm.emptyConversations = (vm.conversations.length === 0);//uncomment when ready
                });
	        });
        }

		// Ignore this for now.
        $scope.$on('$destroy', function() {
		    navi.off("postpop");
	    });

        // Navigates to the new conversation page
        function newConversation(){
            navi.pushPage("./views/messages/new-conversation.html", { animation: "lift" });
        }

        // Navigates to the specified conversation page
        function goToConversation(conversation){
            navi.pushPage("./views/messages/individual-conversation.html", { animation: "slide", convo: conversation});
        }

    }
})();
