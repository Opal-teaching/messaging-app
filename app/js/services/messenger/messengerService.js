(function(){
    var module = angular.module("messaging-app");

    module.service("MessengerService", MessengerService);
    MessengerService.$inject = ["$q","UserService"];

    function MessengerService($q,UserService) {

        var conversations = [];

	    var service = {
		    addConversation: addConversation,
		    getConversations: getConversations,
		    getConversationsFromServer: getConversationsFromServer,
		    sendMessage: sendMessage,
		    deleteConversation: deleteConversation,
		    getConversationById: getConversationById
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


        function addConversation(imageUrl, name) {
            console.log();
            conversations.push(
                {
                    "id": uuidv4(),
                    "imageUrl": imageUrl,
                    "lastMessage": null,
                    "user_1": name,
                    "user_2": UserService.getUser(),
                    "messages": []
                });

            console.log(conversations);
        }


        function getConversations() {
            return conversations;
        }


        function sendMessage(conversationId, messageContent) {
            var elementId = conversations.findIndex(function(element) {
                return element.id === conversationId;
            });
            conversations[elementId].messages.push(conversations[elementId].lastMessage);
            conversations[elementId].lastMessage = {
                    "messageContent": messageContent,
                    "messageDate": new Date(),
                    "messageId": uuidv4(),
                    "from": UserService.getUser()
                }
        }

        function deleteConversation(conversationId) {
            var elementId = conversations.findIndex(function(element) {
                return element.id === conversationId;
            });
            conversations.splice(elementId, 1);
        }


        function getConversationById(id) {
           return conversations.find(function(element) {
                return element.id === id;
            })
        }


        function uuidv4() {
            return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
                (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        )
        }

        /* TODO: Implement server side */

         function getConversationsFromServer() {
         }
    }
})();