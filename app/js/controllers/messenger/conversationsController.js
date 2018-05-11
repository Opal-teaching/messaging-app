(function(){
    var module = angular.module('messaging-app');

    /**
     * @ngdoc controller
     * @name messaging-app.controller:ConversationsController
     * @requires messaging-app.service:MessengerService
     * @requires $timeout
     * @requires $scope
     * @description Manages ./views/messages/conversations.html.
     *              This page provides a list of all of a person's conversations.
     */
    module.controller('ConversationsController', ConversationsController);

    ConversationsController.$inject = ["MessengerService", "$scope", "$timeout"];
    function ConversationsController(MessengerService, $scope, $timeout){

    	// Implement the following functions and a view
        var vm = this;
        /**
         * @ngdoc property
         * @name messaging-app.controller:ConversationsController#conversations
         * @propertyOf messaging-app.controller:ConversationsController
         * @type {Array}
         * @description Array of conversations for a given user.
         */
        vm.conversations = [];
        /**
         * @ngdoc property
         * @name messaging-app.controller:ConversationsController#emptyConversations
         * @propertyOf messaging-app.controller:ConversationsController
         * @description Flag that toggles the 'No message' text.
         */
        vm.emptyConversations = true;
        /**
         * @ngdoc property
         * @name messaging-app.controller:ConversationsController#searchConversationString
         * @propertyOf messaging-app.controller:ConversationsController
         * @description Search string typed into the search bar.
         */
        vm.searchConversationString = "";

        vm.newConversation = newConversation;
        vm.goToConversation = goToConversation;

        initController();

        ////////////////////////////////////////////
        /**
         * @ngdoc method
         * @name messaging-app.controller:ConversationsController#initController
         * @methodOf messaging-app.controller:ConversationsController
         * @description Initializes the controller and the scope variables.
         */
        function initController(){

	        vm.conversations = MessengerService.getConversations();
	        vm.emptyConversations = (vm.conversations.length === 0);

	        // Initialize events

            initializeEvents();

        }
        /**
         * @ngdoc method
         * @name messaging-app.controller:ConversationsController#initializeEvents
         * @methodOf messaging-app.controller:ConversationsController
         * @description Initializes navigator event to refresh conversations.
         */
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
        /**
         * @ngdoc event
         * @name messaging-app.controller:ConversationsController#$destroy
         * @eventOf messaging-app.controller:ConversationsController
         * @description Listens to the controller destruction and kills event listeners.
         */
        $scope.$on('$destroy', function() {
		    navi.off("postpop");
	    });

        /**
         * @ngdoc method
         * @name messaging-app.controller:ConversationsController#newConversation
         * @methodOf messaging-app.controller:ConversationsController
         * @description Navigates to the new conversation page.
         */
        function newConversation(){
            navi.pushPage("./views/messages/new-conversation.html", { animation: "lift" });
        }

        /**
         * @ngdoc method
         * @name messaging-app.controller:ConversationsController#goToConversation
         * @methodOf messaging-app.controller:ConversationsController
         * @description Navigates to the specified conversation page.
         */
        function goToConversation(conversation){
            navi.pushPage("./views/messages/individual-conversation.html", { animation: "slide", convo: conversation});
        }

    }
})();
