(function(){
    var module = angular.module('messaging-app');

    module.controller('ConversationsController', ConversationsController);

    ConversationsController.$inject = ["MessengerService", "$scope", '$timeout'];
    function ConversationsController(MessengerService, $scope, $timeout){

    	// TODO: Implement the following functions and a view
        var vm = this;
        vm.conversations = [];
        vm.newConversation = newConversation; // uncomment once implemented.
        vm.goToConversation = goToConversation;// uncomment once implemented.
        vm.emptyConversations = true;
        initController();




        ////////////////////////////////////////////
        function initController(){

	        vm.conversations = MessengerService.getConversations(); //uncomment when ready
	        vm.emptyConversations = (vm.conversations.length !== 0)? false:true; //uncomment when ready

	        // Initialize events

            initializeEvents();

        }

        function goToConversation(conversation){
            navi.pushPage('./views/messages/individual-conversation.html', {conversation:conversation});
        }

        function newConversation(){
            navi.pushPage('./views/messages/new-conversation.html');
        }


        function initializeEvents() {
            // This function refreshs your conversation list any time you pop a page so to keep them up to date.
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


    }
})();
