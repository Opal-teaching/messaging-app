(function(){
    var module = angular.module('messaging-app');

    module.controller('ConversationsController', ConversationsController);

    ConversationsController.$inject = ["MessengerService", "$scope","$timeout"];
    function ConversationsController(MessengerService, $scope, $timeout){

    	// TODO: Implement the following functions and a view
        var vm = this;
        vm.conversations = [];
        // vm.newConversation = newConversation; // uncomment once implemented.

        // vm.goToConversation = goToConversation; // uncomment once implemented.
        vm.emptyConversations = true;
        vm.toggleSearchbar = false;
        vm.toggle = toggleSearchbar;
        vm.searchContent = "";
        vm.filteredConv = filteredConv;
        initController();

        ////////////////////////////////////////////
        function initController(){

	        vm.conversations = MessengerService.getConversations().sort(compareDate); //uncomment when ready
	        vm.emptyConversations = (vm.conversations.length !== 0)? false:true; //uncomment when ready

	        // Initialize events

            initializeEvents();

        }


        function initializeEvents() {
        	// This function refreshs your conversation list any time you pop a page so to keep them up to date.
	        // We will go over events later.
	        navi.on("postpop",function(event){
                $timeout(function(){
		           vm.conversations = MessengerService.getConversations().sort(compareDate); //uncomment when ready
		            vm.emptyConversations = (vm.conversations.length === 0);//uncomment when ready
                });
	        });
        }

        function toggleSearchbar() {
            vm.toggleSearchbar = (vm.toggleSearchbar)? false:true;
        }

        function filteredConv(){
            return vm.conversations.filter(function(c){
                if(vm.searchContent == ''){return false;}
                return c.user_1.toLowerCase().includes(vm.searchContent.toLowerCase());
            });
        }

        var compareDate = function (a, b){
            var keyA = new Date(a.lastMessage.messageDate),
                keyB = new Date(b.lastMessage.messageDate);
            if(keyA < keyB) return 1;
            if(keyA > keyB) return -1;
            return 0;
        };

		// Ignore this for now.
        $scope.$on('$destroy', function() {
		    navi.off("postpop");
	    });


    }
})();
