(function(){
	'use strict';

	angular
		.module('messaging-app')
		.controller('NewConversationController', NewConversationController);

	NewConversationController.$inject = ["MessengerService"];

	function NewConversationController(MessengerService) {

		let vm = this;
		vm.imageUrl = "";
		vm.name = "";

		// TODO: Implement the following functions (uncomment once implemented).
		// vm.checkFields = checkFields;
		// vm.createConversation = createConversation;

		activate();

		//////////////////////////////

		function activate() {

		}

		// TODO: Add your functions here.
	}
})();
