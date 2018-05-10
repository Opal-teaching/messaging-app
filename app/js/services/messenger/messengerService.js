(function(){
    var module = angular.module("messaging-app");

    module.service("MessengerService", MessengerService);
    MessengerService.$inject = ["$q","UserService"];

    function MessengerService($q,UserService) {

        var conversations = [];

		    // TODO: Get conversations from server. Add the following functions. Uncomment functions as you add them.
	    var service = {
		    addConversation: addConversation,
		    getConversations: getConversations,
		    // getConversationsFromServer:getConversationsFromServer,
		    sendMessage:sendMessage,
		    deleteConversation:deleteConversation,
		    getConversationById:getConversationById
        };

	    // Initialize conversations with dummy data;;
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

		// Creates a new conversation with null value for lastmessage and an empty array of messages
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

		// Generates a new conversation id which isn't already used in the conversations array
		function generateUniqueId(){

			// Get an array of all the ids from conversations
			let idList = conversations.map(
                function(x){return x.id;}
            );

			// Get the minimum id value from the list of ids
			let id = Math.min.apply(null,idList);

			// Loop to increment the minimum id until an unused id is found
			do{
				id++;
			}
			while(idList.indexOf(id) !== -1); // While id is found in idList

			return id;
		}

        // Generates a new conversation id which isn't already used in the conversations array
        function generateUniqueMessageId(conversation){

            // Get an array of all the message ids from the conversation
            let idList = conversations.map(
                function(x){return x.messageId;}
            );

            // Get the minimum id value from the list of ids
            let id = Math.min.apply(null,idList);

            // Loop to increment the minimum id until an unused id is found
            do{
                id++;
            }
            while(idList.indexOf(id) !== -1); // While id is found in idList

            return id;
        }

		// Gets a reference to the conversations array
		function getConversations(){
			return conversations;
		}

		// Gets a deep copy of the conversations array
		function getConversationsCopy(){

			let deepCopy = [];

			// For each conversation...
			for (let c in conversations) {

                // Copy all the messages for this conversation
				let messagesCopy = copyMessages(c.messages);

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

		// Returns a deep copy of an array of messages
		// If there are no messages, returns []
		function copyMessages(mArray){

            let messagesCopy = [];

            for (let m in mArray) {
                messagesCopy.push(copyMessage(m));
            }

            return messagesCopy;
		}

		// Creates a copy of an object (a message) by copying the values of all its enumerable own properties
		// Warning: not a deep copy
		function copyMessage(m){
			return Object.assign({}, m);
		}

		// Add a message to the appropriate conversation
		// Note: the conversation gains a copy of the message, and last message is another copy (no object references)
		// This is safer because an added message is permanent (no outside function has a reference to it and can change it)
		function sendMessage(conversation, contents, messageDate){

			// Get the name of this user
            let thisUser = UserService.getUser();

			// Create the message
			let newMessage = {
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

		// Gets the first conversation matching the two given users, no matter the order of user_1 and user_2
		// Returns null if no match is found
		function getConversationByUsers(user_1, user_2){

			for (let c in conversations){
				if(    (c.user_1 === user_1 && c.user_2 === user_2)
					|| (c.user_1 === user_2 && c.user_2 === user_1)){

					return c;
				}
			}
			return null;
		}

        // Gets the first conversation matching the given conversation id
		// Returns null if the id is not found
        function getConversationById(id){

            for (let c in conversations){
                if(c.id === id) {
                    return c;
                }
            }
            return null;
        }

        function deleteConversation(conversation) {

			// Find the index of this conversation
			let index = conversations.indexOf(conversation);

			// If the conversation is found, remove it
			if (index >= 0){
				conversations.splice(index,1);
			}
		}

    }
})();