(function(){
    var module = angular.module('messaging-app');

    module.controller('ConversationsController', ConversationsController);

    ConversationsController.$inject = ["MessengerService", "$timeout", "$scope"];
    function ConversationsController(MessengerService, $timeout, $scope){

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
        	// This function refreshs your conversation list any time you pop a page so to keep them up to date.
	        // We will go over events later.
	        navi.on("prepop",function(event){
	            $timeout(function(){
		           vm.conversations = MessengerService.getConversations();
		           vm.emptyConversations = (vm.conversations.length === 0);
                });
	        });
        }
		// Ignore this for now.
        $scope.$on('$destroy', function() {
		    navi.off("postpop");
	    });
        
        
        function newConversation() {
            navi.pushPage("./views/messages/new-conversation.html", { animation: "lift" });
        }

        function goToConversation(conversation) {
            navi.pushPage(  "./views/messages/individual-conversation.html",
                            { animation: "slide", conversation: conversation });
        }

    }
})();
