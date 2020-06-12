(function(){
	'use strict';

	angular
		.module("messaging-app")
		.factory("MessengerService", MessengerService);

    MessengerService.$inject = ["$q","UserService"];

    function MessengerService($q, UserService) {

        let conversations = [];

		// Dummy data that is stored here instead of on a server/Firebase
		let mockConversationsOnServer = [
			{
				"id":"0",
				"imageUrl":"https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&h=350",
				"lastMessage":{"messageContent":"Welcome to Opal!","messageDate":"May 7, 2018 9:03 am","messageId":"3","from":"Laurie Hendren"},
				"user_1":"Laurie Hendren",
				"user_2":"David Herrera",
				"messages":[{"messageContent":"Hello!","messageDate":"May 7, 2018 9:01 am","messageId":"1","from":"Laurie Hendren"},
					{"messageContent":"Hey Laurie","messageDate":"May 7, 2018 9:02 am","messageId":"2","from":"David Herrera"},
					{"messageContent":"Welcome to Opal!","messageDate":"May 7, 2018 9:03 am","messageId":"3","from":"Laurie Hendren"}]
			},
			{
				"id":"1",
				"imageUrl":"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
				"lastMessage": {"messageContent":"Welcome to Opal!","messageDate":"May 7, 2018 9:03 am","messageId":"2","from":"David Herrera"},
				"user_1": "John Kildea",
				"user_2": "David Herrera",
				"messages":[ {"messageContent":"Hello!","messageDate":"May 7, 2018 9:01 am","messageId":"0","from":"John Kildea"},
					{"messageContent":"Hey John","messageDate":"May 7, 2018 9:02 am","messageId":"1","from":"John Kildea"},
					{"messageContent":"Welcome to Opal!","messageDate":"May 7, 2018 9:03 am","messageId":"2","from":"John Kildea"}]
			},
			{
				"id":"2",
				"imageUrl":"https://images.pexels.com/photos/126407/pexels-photo-126407.jpeg?auto=compress&cs=tinysrgb&h=350",
				"lastMessage":{"messageContent":"Welcome to Opal!","messageDate":"May 7, 2018 9:03 am","messageId":"2","from":"Tarek Hijal"},
				"user_1":"Tarek Hijal",
				"user_2":"David Herrera",
				"messages":[ {"messageContent":"Hello!","messageDate":"May 7, 2018 9:01 am","messageId":"0","from":"Tarek Hijal"},
					{"messageContent":"Hey Tarek","messageDate":"May 7, 2018 9:02 am","messageId":"1","from":"David Herrera"},
					{"messageContent":"Welcome to Opal!","messageDate":"May 7, 2018 9:03 am","messageId":"2","from":"Tarek Hijal"}]
			}
		];

		// TODO: Implement the following functions (uncomment once implemented).
		//       You may implement more or fewer functions, as needed.
	    let service = {
		    // addConversation: addConversation, // Adds a new conversation (uses UserService to define "user_2")
		    // getConversations: getConversations, // Returns conversations
		    // getConversationsFromServer: getConversationsFromServer, // Loads mockConversationsOnServer into conversations
		    // sendMessage: sendMessage, // Adds a new message
		    // deleteConversation: deleteConversation,
		    // getConversationById: getConversationById
        };
        return service;

		//////////////////////////////

		// TODO: Add your functions here. You may need dates; for this, use the JavaScript constructor, new Date().
    }
})();