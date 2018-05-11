(function(){
	var module = angular.module("messaging-app");

    /**
	 * @ngdoc controller
	 * @name messaging-app.controller:NewConversationController
	 * @require messaging-app.servie:MessengerService
     * @requires $timeout
     * @requires $scope
     * @description Manages  ./views/messages/new-conversation.html
     */
	module.controller("NewConversationController", NewConversationController);
	NewConversationController.$inject = ["MessengerService"];
	function NewConversationController(MessengerService){
		var vm = this;

		vm.checkFields = checkFields;
		vm.createConversation = createConversation; // Uncomment as you add code

        /**
         * @ngdoc property
         * @name messaging-app.controller:NewConversationController#imageUrl
         * @propertyOf messaging-app.controller:NewConversationController
         * @description Url for person in new conversation
         */
		vm.imageUrl = "";
        /**
         * @ngdoc property
         * @name messaging-app.controller:NewConversationController#name
         * @propertyOf messaging-app.controller:NewConversationController
         * @description Name for person in new conversation
         */
		vm.name = "";

		///////////////////////////////
		/* Add your functions here*/
        /**
         * @ngdoc method
         * @name messaging-app.controller:NewConversationController#checkFields
         * @methodOf messaging-app.controller:NewConversationController
         * @description Checks fields (URL and name) for ngDisabled property of the submit button
         */
		function checkFields (){
			if(vm.imageUrl==="" || vm.name===""){
				return true;
			}else{
				return false;
			}
		}
        /**
         * @ngdoc method
         * @name messaging-app.controller:NewConversationController#createConversation
         * @methodOf messaging-app.controller:NewConversationController
         * @description Calls {@link  messaging-app.service:MessengerService#addConversation MessengerService.addConversation}
         *              to add a conversation for the user
         */
		function createConversation (){
			MessengerService.addConversation(vm.name,vm.imageUrl);
			navi.popPage();
		}
	}
})();