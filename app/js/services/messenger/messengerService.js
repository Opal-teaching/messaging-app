(function(){
    /**
     * @ngdoc service
     * @name messaging-app.service:MessengerService
	 * @requires $q
	 * @requires messaging-app.service:UserService
     * @description Model for the chat application, manipulates the conversations array for a given user.
     */
    var module = angular.module("messaging-app");

    module.service("MessengerService", MessengerService);
    MessengerService.$inject = ["$q","UserService"];

    function MessengerService($q,UserService) {

        /**
         * @ngdoc property
         * @name messaging-app.service:MessengerService#conversations
         * @propertyOf messaging-app.service:MessengerService
         * @description Contains all conversations in the messaging app for this particular user.
         * @type {Array}
         */
        var conversations = [];

		    // Add the following functions. Uncomment functions as you add them.
	    var service = {

		    addConversation: addConversation,
		    getConversations: getConversations,
            // TODO Get conversations from server.
		    // getConversationsFromServer:getConversationsFromServer,
		    sendMessage:sendMessage,
		    deleteConversation:deleteConversation,
		    getConversationById:getConversationById
        };

	    // Initialize conversations with dummy data
	    conversations = [
		    {
			    "id":"0",
			    "imageUrl":"https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&h=350",
			    "lastMessage":{"messageContent":"Welcome to Opal!","messageDate":"May 8, 2018 9:03 am","messageId":"3","from":"Laurie Hendren"},
			    "user_1":"Laurie Hendren",
			    "user_2":"David Herrera",
			    "messages":[{"messageContent":"Hello!","messageDate":"May 7, 2018 9:01 am","messageId":"1","from":"Laurie Hendren"},
				    {"messageContent":"Hey Laurie","messageDate":"May 7, 2018 9:02 am","messageId":"2","from":"David H"},
				    {"messageContent":"Welcome to Opal!","messageDate":"May 8, 2018 9:03 am","messageId":"3","from":"Laurie Hendren"}]
		    },
		    {
			    "id":"1",
			    "imageUrl":"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
		        "lastMessage": {"messageContent":"Welcome to Opal!","messageDate":"May 7, 2018 9:03 am","messageId":"2","from":"David Herrera"},
	            "user_1": "John Kildea",
			    "user_2": "David Herrera",
			    "messages":[ {"messageContent":"Hello!","messageDate":"May 7, 2018 9:01 am","messageId":"0","from":"John Kildea"},
				    {"messageContent":"Hey John","messageDate":"May 7, 2018 9:02 am","messageId":"1","from":"John Kildea"},
				    {"messageContent":"Welcome to Opal!","messageDate":"May 7, 2018 9:03 am","messageId":"2","from":"David Herrera"}]
		    },
		    {
			    "id":"2",
			    "imageUrl":"https://images.pexels.com/photos/126407/pexels-photo-126407.jpeg?auto=compress&cs=tinysrgb&h=350",
			    "lastMessage":{"messageContent":"Good morning!","messageDate":"May 8, 2018 5:03 am","messageId":"2","from":"Tarek Hijal"},
			    "user_1":"Tarek Hijal",
			    "user_2":"David Herrera",
			    "messages":[ {"messageContent":"Hello!","messageDate":"May 7, 2018 9:01 am","messageId":"0","from":"Tarek Hijal"},
				    {"messageContent":"Hey Tarek","messageDate":"May 7, 2018 9:02 am","messageId":"1","from":"David Herrera"},
				    {"messageContent":"Good morning!","messageDate":"May 8, 2018 5:03 am","messageId":"2","from":"Tarek Hijal"}]
		    }
	    ];
        return service;


        ///////////////////////////////////////

	    /* You may need dates, for this use JavaScript construct, new Date();*/

        /**
         * @ngdoc method
         * @name messaging-app.service:MessengerService#addConversation
         * @methodOf messaging-app.service:MessengerService
         * @description Creates a new conversation with null value for lastmessage and an empty array of messages.
         * @param {string} otherUser Name of the other person in the conversation
         * @param {string} imageUrl URL of the image to use to represent the other person
         */
		function addConversation(otherUser, imageUrl){

			conversations.push(
				{
                    "id": generateUniqueId(),
                    "imageUrl": imageUrl,
                    "lastMessage": null,
                    "user_1": otherUser,
                    "user_2": UserService.getUser(),
                    "messages":[]
				}
			)
		}
        /**
         * @ngdoc method
         * @name messaging-app.service:MessengerService#generateUniqueId
         * @methodOf messaging-app.service:MessengerService
         * @description Generates a new conversation id which isn't already used in the conversations array.
         * @returns {number} Unique conversation id
         */
		function generateUniqueId(){

			// Get an array of all the ids from conversations
			var idList = conversations.map(
                function(x){return x.id;}
            );

			// Get the minimum id value from the list of ids
			var id = Math.min.apply(null,idList);

			// Loop to increment the minimum id until an unused id is found
			do{
				id++;
			}
			while(idList.indexOf(id) !== -1); // While id is found in idList

			return id;
		}
        /**
         * @ngdoc method
         * @name messaging-app.service:MessengerService#generateUniqueMessageId
         * @methodOf messaging-app.service:MessengerService
         * @description Generates a new message id which isn't already used in this conversation's messages array.
         * @returns {number} Unique message id
         */
        function generateUniqueMessageId(conversation){

            // Get an array of all the message ids from the conversation
            var idList = conversations.map(
                function(x){return x.messageId;}
            );

            // Get the minimum id value from the list of ids
            var id = Math.min.apply(null,idList);

            // Loop to increment the minimum id until an unused id is found
            do{
                id++;
            }
            while(idList.indexOf(id) !== -1); // While id is found in idList

            return id;
        }
        /**
         * @ngdoc method
         * @name messaging-app.service:MessengerService#getConversations
         * @methodOf messaging-app.service:MessengerService
         * @description Getter for the conversations array (reference).
         * @returns {Array} Conversations array
         */
		function getConversations(){
			return conversations;
		}
        /**
         * @ngdoc method
         * @name messaging-app.service:MessengerService#getConversationsCopy
         * @methodOf messaging-app.service:MessengerService
         * @description Returns a deep copy of the conversations array.
         * @returns {Array} Copy of the conversations array
         */
		function getConversationsCopy(){

			var deepCopy = [];

			// For each conversation...
			for (var c in conversations) {

                // Copy all the messages for this conversation
				var messagesCopy = copyMessages(c.messages);

				// Add a copy of this conversation to the deep copy
				deepCopy.push(
					{
                        "id": c.id,
                        "imageUrl": c.imageUrl,
                        "lastMessage": copyMessage(c.lastMessage),
                        "user_1": c.user_1,
                        "user_2": c.user_2,
                        "messages": messagesCopy
					}
				)
			}
			return deepCopy;
		}
        /**
         * @ngdoc method
         * @name messaging-app.service:MessengerService#copyMessages
         * @methodOf messaging-app.service:MessengerService
         * @description Returns a deep copy of the input messages array.
		 * @param {Array} mArray Messages array to copy
         * @returns {Array} Copy of the messages array
         */
		function copyMessages(mArray){

            var messagesCopy = [];

            for (var m in mArray) {
                messagesCopy.push(copyMessage(m));
            }

            return messagesCopy;
		}

		// Creates a copy of an object (a message) by copying the values of all its enumerable own properties
		// Warning: not a deep copy
        /**
         * @ngdoc method
         * @name messaging-app.service:MessengerService#copyMessage
         * @methodOf messaging-app.service:MessengerService
         * @description Creates a copy of an object (a message) by copying the values of all its enumerable own
		 *              properties. Not a deep copy if the message contains objects.
         * @param {*} m Message to copy
         * @returns {*} Copy of the message
         */
		function copyMessage(m){
			return Object.assign({}, m);
		}
        /**
         * @ngdoc method
         * @name messaging-app.service:MessengerService#sendMessage
         * @methodOf messaging-app.service:MessengerService
         * @param {*} conversation Conversation to send the message to
		 * @param {string} contents Contents of the message
         * @param {string} messageDate Date and time at which the message was sent
         * @description Adds a message to the appropriate conversation.
		 * 				<br>Note: the conversation gains a copy of the message, and last message is another copy
		 * 				(no object references). This safer because an added message is permanent (no outside function
		 * 				has a reference to it and can change it).
         */
		function sendMessage(conversation, contents, messageDate){

			// Get the name of this user
            var thisUser = UserService.getUser();

			// Create the message
			var newMessage = {
          	  	"messageContent": contents,
				"messageDate": messageDate,
				"messageId": generateUniqueMessageId(),
				"from": thisUser
        	}

			// Add the message to the conversation's messages array
			conversation.messages.push(newMessage);

			// Update this conversation's lastMessage with another copy of the message
			conversation.lastMessage = copyMessage(newMessage);
		}
        /**
         * @ngdoc method
         * @name messaging-app.service:MessengerService#getConversationByUsers
         * @methodOf messaging-app.service:MessengerService
         * @param {string} user_1 Name of the first user
		 * @param {string} user_2 Name of the second user
         * @description Gets the first conversation matching the two given users, no matter the order of user_1
		 *              and user_2.
         * @returns {Object|null} Conversation matching the users, or null when not found.
         */
		function getConversationByUsers(user_1, user_2){

			for (var c in conversations){
				if(    (c.user_1 === user_1 && c.user_2 === user_2)
					|| (c.user_1 === user_2 && c.user_2 === user_1)){

					return c;
				}
			}
			return null;
		}

        // Gets the first conversation matching the given conversation id
		// Returns null if the id is not found
        /**
         * @ngdoc method
         * @name messaging-app.service:MessengerService#getConversationById
         * @methodOf messaging-app.service:MessengerService
         * @param {string|number} id Conversation id
         * @description Finds a conversation matching a conversation id
         * @returns {Object|null} Conversation matching the id, or null when not found
         */
        function getConversationById(id){

            for (var c in conversations){
                if(c.id === id) {
                    return c;
                }
            }
            return null;
        }
        /**
         * @ngdoc method
         * @name messaging-app.service:MessengerService#deleteConversation
         * @methodOf messaging-app.service:MessengerService
         * @param {string} conversation Conversation
         * @description Deletes a conversation from the user's conversations array
         */
        function deleteConversation(conversation) {

			// Find the index of this conversation
			var index = conversations.indexOf(conversation);

			// If the conversation is found, remove it
			if (index >= 0){
				conversations.splice(index,1);
			}
		}

    }
})();