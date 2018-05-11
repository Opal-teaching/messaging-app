(function(){
    /**
     * @ngdoc service
     * @name messaging-app.service:MessengerService
     * @description Model for the chat application, manipulates the conversations array
     */
    var module = angular.module("messaging-app");

    module.service("MessengerService", MessengerService);
    MessengerService.$inject = ["$q","UserService"];

    function MessengerService($q,UserService) {
        /**
         * @ngdoc property
         * @name messaging-app.service:MessengerService#conversations
         * @propertyOf messaging-app.service:MessengerService
         * @description Contains the conversations of the messaging app for this particular user.
         * @type {Array}
         */
        var conversations = [];

		    // TODO: Add the following functions. Uncommend functions as you add them.
        /**
         *
         * @type {{addConversation: addConversation, getConversations: getConversations, getConversationMessages: getConversationMessages, getConversationsFromServer: getConversationsFromServer}}
         */
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
				    {"messageContent":"Welcome to Opal!","messageDate":"May 7, 2018 9:03 am","messageId":"2","from":"John Kildea"}]
		    },
		    {
			    "id":"2",
			    "imageUrl":"https://images.pexels.com/photos/126407/pexels-photo-126407.jpeg?auto=compress&cs=tinysrgb&h=350",
			    "lastMessage":{"messageContent":"Welcome to Opal!","messageDate":"May 9, 2018 9:03 am","messageId":"2","from":"Tarek Hijal"},
			    "user_1":"Tarek Hijal",
			    "user_2":"David Herrera",
			    "messages":[ {"messageContent":"Hello!","messageDate":"May 7, 2018 9:01 am","messageId":"0","from":"Tarek Hijal"},
				    {"messageContent":"Hey Tarek","messageDate":"May 7, 2018 9:02 am","messageId":"1","from":"David Herrera"},
				    {"messageContent":"Welcome to Opal!","messageDate":"May 9, 2018 9:03 am","messageId":"2","from":"Tarek Hijal"}]
		    }
	    ];

        // conversations = [];



        ///////////////////////////////////////

	    /* TODO: Write your functions here, you may need dates, for this use JavaScript construct, new Date();*/
        /**
         * @ngdoc method
         * @name messaging-app.service:MessengerService#getConversations
         * @methodOf messaging-app.service:MessengerService
         * @description Getter for the conversations array
         * @returns {Array} conversations array.
         */
		function getConversations(){
			return conversations;
		};

        /**
         * @ngdoc method
         * @name messaging-app.service:MessengerService#getConversationById
         * @methodOf messaging-app.service:MessengerService
         * @param {string|number} id Conversation id
         * @description Searches and returns a conversation based on an id
         * @returns {Object|null} conversation matching the id, or null when not found
         */
        function getConversationById(id)
        {
            var results =  conversations.filter(function(conv){return conv.id === id});
            if(results.length !== 1) return null;

            return results[0];
        }

        /**
         * @ngdoc method
         * @name messaging-app.service:MessengerService#addConversation
         * @methodOf messaging-app.service:MessengerService
         * @description Takes a name and an imageUrl, and adds a new conversation onto the conversations array.
         * @param {string} name Name of person in the conversation
         * @param {string} imageUrl Url of image
         */
		function addConversation(name, url){
            var length = conversations.length;
            var new_ele = {
                "id":length,
                "imageUrl": url,
                "lastMessage":{},
                "user_1":name,
                "user_2":UserService.getUser(),
                "messages":[]

            };
            conversations.push(new_ele);
            navi.popPage();
		}

        /**
         * @ngdoc method
         * @name messaging-app.service:MessengerService#sendMessage
         * @methodOf messaging-app.service:MessengerService
         * @param {string} conversationId Conversation id
         * @param {string} messageContent Conversation id
         * @description Adds a message to a conversation.
         */
		function sendMessage(messageContent,conversation){
			console.log(new Date());
			var new_msg = {
				"messageContent": messageContent,
				"messageDate" : new Date(),
				"messageId": conversation.messages.length,
				"from": UserService.getUser()
			}
			conversation.messages.push(new_msg);
			conversation.lastMessage = conversation.messages[conversation.messages.length-1];

		}

        /**
         * @ngdoc method
         * @name messaging-app.service:MessengerService#deleteConversation
         * @methodOf messaging-app.service:MessengerService
         * @param {string} conversationId Conversation id
         * @description Deletes conversation from the user's conversations
         * @returns {boolean} Returns a success or failure flag
         */
		function deleteConversation(conversation){

			conversations.splice(conversations.indexOf(conversation),1);
		}

        return service;

    }
})();