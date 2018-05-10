(function(){
    var module = angular.module("messaging-app");

    module.service("MessengerService", MessengerService);
    MessengerService.$inject = ["$q","UserService"];

    function MessengerService($q,UserService) {

        var conversations = [];

		    // TODO: Add the following functions. Uncommend functions as you add them.
	    var service = {
		    addConversation: addConversation,
		    getConversations: getConversations,
		    // getConversationsFromServer:getConversationsFromServer,
		    sendMessage:sendMessage,
		    deleteConversation:deleteConversation,
            generateId:generateId,
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

	    /* TODO: Write your functions here, you may need dates, for this use JavaScript construct, new Date();*/
        function getConversations(){
        	return conversations;
		}

        function deleteConversation(id){
        	var index = conversations.findIndex(x => x.id === id);
            conversations.splice(index, 1);
		}

		function sendMessage(message,id){
            var index = conversations.findIndex(x => x.id === id);
            conversations[index].messages.push(message);
            conversations[index].lastMessage = message;
		}

		function addConversation(conversation){
            conversations.push(conversation);
		}

		function generateId(){
            var lastId = conversations[conversations.length-1].id;
            return parseInt(lastId)+1;
		}

		function getConversationById(id){
            return conversations.find(x => x.id === id);
		}


    }
})();