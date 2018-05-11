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

		    // Add the following functions. Uncommend functions as you add them.
        /**
		 *
         * @type {{addConversation: addConversation, getConversations: (function(): Array), getConversationsFromServer: (function(): Array), sendMessage: sendMessage, deleteConversation: deleteConversation, getConversationById: getConversationById}}
         */
	    var service = {
		    addConversation: addConversation,
		    getConversations: getConversations,
		    getConversationsFromServer:getConversationsFromServer,
		    sendMessage:sendMessage,
		    deleteConversation:deleteConversation,
		    getConversationById:getConversationById
        };
	    // Initialize conversations with dummy data;;
	    conversations = [
		    {
			    "id":"0",
			    "imageUrl":"https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&h=350",
			    "lastMessage":{"messageContent":"Welcome to Opal!","messageDate":"May 7, 2018 9:03 am","messageId":"3","from":"Laurie Hendren"},
			    "user_1":"Laurie Hendren",
			    "user_2":"David Herrera",
			    "messages":[{"messageContent":"Hello!","messageDate":"May 7, 2018 9:01 am","messageId":"1","from":"Laurie Hendren"},
				    {"messageContent":"Hey Laurie","messageDate":"May 7, 2018 9:02 am","messageId":"2","from":"David H"},
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
        return service;

        ///////////////////////////////////////

	    /* Write your functions here, you may need dates, for this use JavaScript construct, new Date();*/
        /**
		 * @ngdoc method
		 * @name messaging-app.service:MessengerService#addConversation
		 * @methodOf messaging-app.service:MessengerService
		 * @description add a conversation into conversation array by taking a name and an URL
         * @param {string} name Name of the person in conversation
         * @param {string} imageUrl of the person's image
         */
		function addConversation (name,imageUrl){
            if(typeof name === "string" && name.length> 0
                && typeof imageUrl === "string" && imageUrl.length> 0){
            	var id = conversations.length;
                var convo = {
                    id: id,
                    user_1: name,
                    user_2: UserService.getUser(),
                    imageUrl: imageUrl,
                    lastMessage: null,
                    messageDate: null,
                    messages: []
                };
                conversations.push(convo);
            }
		}

        /**
		 * @ngdoc method
		 * @name messaging-app.service:MessengerService#getConversations
		 * @methodOf messaging-app.service:MessengerService
		 * @description Getter for the conversations array
         * @returns {Array} conversations array
         */
		function getConversations(){
			return conversations;
		}

        /**
		 * @ngdoc method
		 * @name messaging-app.service:MessengerService#getConversationsFromServer
		 * @methodOf messaging-app.service:MessengerService
         * @returns {Array} conversations array
         */
		function getConversationsFromServer(){
            return conversations;
        }

        /**
		 * @ngdoc method
		 * @name messaging-app.service:MessengerService#sendMessage
		 * @methodOf messaging-app.service:MessengerService
		 * @description Adds a message to a conversation.
         * @param {string} idSent conversation id
         * @param {string} message message content
         * @returns {boolean} success/failure flag
         */
		function sendMessage (idSent,message){
			var d = new Date();
			var convoIndex = 0;
			var found = false;
            conversations.forEach(function(item, index, array){
                if(item.id === idSent) {
                    convoIndex = index;
                    found = true;
                }
            });
            if (found){
                var m = {
                	"messageContent":message,
					"messageDate":d,
					"messageId":conversations[convoIndex].messages.length,
					"from":UserService.getUser()
                };
                conversations[convoIndex].messages.push(m);
                conversations[convoIndex].lastMessage = m;
                return true;
			}else{
            	return false;
			}
        }

        /**
		 * @ngdoc method
		 * @name messaging-app.service:MessengerService#deleteConversation
		 * @methodOf messaging-app.service:MessengerService
         * @param {string} idToDel conversation id
         * @returns {boolean} success/failure flag
         */
		function deleteConversation (idToDel){
			var convoIndex = 0;
			var found=false;
            conversations.forEach(function(item, index, array){
                if(item.id === idToDel) {
                    convoIndex = index;
                    found = true;
                }
            });
            if (found){
            	conversations.splice(convoIndex,1);
            	return true;
			}else{
            	return false;
			}

		}

        /**
		 * @ngdoc method
		 * @name messaging-app.service:MessengerService#getConversationById
		 * @description Searches and returns a conversation based on an id
		 * @methodOf messaging-app.service:MessengerService
         * @param {string|number} idWanted the conversation id
         * @returns {object|null} returns the conversation of the id or null if not found
         */
		function getConversationById (idWanted){
            var convoIndex = 0;
            var found=false;
			conversations.forEach(function(item, index, array){
				if(item.id === idWanted){
					convoIndex = index;
					found = true;
				}
			});
			if (found){
				return conversations[convoIndex];
			}else{
                return null;
            }
        }
    }
})();