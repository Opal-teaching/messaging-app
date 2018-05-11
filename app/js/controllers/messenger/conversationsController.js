(function(){
    var module = angular.module('messaging-app');
    /**
     * @ngdoc controller
     * @name messaging-app.controller:ConversationsController
     * @requires messaging-app.service:MessengerService
     * @requires $timeout
     * @requires $scope
     * @description Manages  ./views/messages/conversations.html
     */
    module.controller('ConversationsController', ConversationsController);

    ConversationsController.$inject = ["MessengerService", "$scope"];
    function ConversationsController(MessengerService, $scope){

    	// TODO: Implement the following functions and a view
        var vm = this;
        /**
         * @ngdoc property
         * @name messaging-app.controller:ConversationsController#conversations
         * @propertyOf messaging-app.controller:ConversationsController
         * @description Contains array of conversations
         */
        vm.conversations = [];
        vm.newConversation = newConversation;
        vm.goToConversation = goToConversation;

        /**
         * @ngdoc property
         * @name messaging-app.controller:ConversationsController#emptyConversations
         * @propertyOf messaging-app.controller:ConversationsController
         * @description Flag to determine when to show 'No message'
         */
        vm.emptyConversations = true;
        initController();

        /**
         * @ngdoc method
         * @name messaging-app.controller:ConversationsController#newConversation
         * @methodOf messaging-app.controller:ConversationsController
         * @description Pushes the new-conversation.html page onto the stack using a 'lift' animation
         */
        function newConversation (){
            navi.pushPage('./views/messages/new-conversation.html', {animation:"lift", param: vm.conversations});
        }

        /**
         * @ngdoc method
         * @name messaging-app.controller:ConversationsController#goToConversation
         * @methodOf messaging-app.controller:ConversationsController
         * @description Pushes the new-conversation.html page onto the stack with the selected
         *              conversation as parameter
         */
        function goToConversation(convo){
            navi.pushPage('./views/messages/individual-conversation.html',{animation:"slide",conversation: convo});
        }

        ////////////////////////////////////////////
        /**
         * @ngdoc method
         * @name messaging-app.controller:ConversationsController#initController
         * @methodOf messaging-app.controller:ConversationsController
         * @description Initializes the controller and the scope variables
         */
        function initController(){

	        vm.conversations = MessengerService.getConversations(); //uncomment when ready
	        vm.emptyConversations = (vm.conversations.length !== 0)? false:true; //uncomment when ready

	        // Initialize events

            initializeEvents();

        }

        /**
         * @ngdoc method
         * @name messaging-app.controller:ConversationsController#initializeEvents
         * @methodOf messaging-app.controller:ConversationsController
         * @description Initializes navigator event to refresh conversations
         */
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
