(function(){
	var module = angular.module("messaging-app");
    /**
     * @ngdoc controller
     * @name messaging-app.controller:NewConversationController
     * @requires messaging-app.service:MessengerService
     * @description Manages ./views/messages/new-conversation.html.
	 *              This page allows the user to create a new conversation.
     */
	module.controller("NewConversationController", NewConversationController);
	NewConversationController.$inject = ["MessengerService"];

	function NewConversationController(MessengerService){

		var vm = this;

        /**
         * @ngdoc property
         * @name messaging-app.controller:NewConversationController#imageUrl
         * @propertyOf messaging-app.controller:NewConversationController
         * @description URL of an image to represent other person in the new conversation.
         */
        vm.imageUrl = "";
        /**
         * @ngdoc property
         * @name messaging-app.controller:NewConversationController#name
         * @propertyOf messaging-app.controller:NewConversationController
         * @description Name of the other person in the new conversation.
         */
        vm.name = "";
		vm.checkFields = checkFields;
		vm.createConversation = createConversation;

		///////////////////////////////

        /**
         * @ngdoc method
         * @name messaging-app.controller:NewConversationController#checkFields
         * @methodOf messaging-app.controller:NewConversationController
         * @description Checks that the imageUrl and name fields are non-empty to enable the submit button.
         */
		function checkFields() {
			// TODO check that the image is a valid image
			return ((vm.imageUrl.length > 0) && (vm.name.length > 0));
		}
        /**
         * @ngdoc method
         * @name messaging-app.controller:NewConversationController#createConversation
         * @methodOf messaging-app.controller:NewConversationController
         * @description Adds the new conversation for the user using
		 *             {@link  messaging-app.service:MessengerService#addConversation MessengerService.addConversation}.
         */
		function createConversation(otherUser, imageUrl) {

            MessengerService.addConversation(otherUser, imageUrl);

            // Go back to the conversations page
            navi.pushPage("./views/messages/conversations.html", { animation: "none" });
		}

	}
})();