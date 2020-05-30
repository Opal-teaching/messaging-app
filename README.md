# Messaging app

The goal of this mini-project is to create a messaging app using this technology stack.
We will have three pages.
1. A page with a list of conversations: [Conversations](./images/image1.png)
2. A page to create conversations:[Create Conversations](./images/image6.png)
3. A conversation page, where we can delete conversations, and send messages:[Create Conversations](./images/image6.png)

For more details on the different views of this app, go through the images folder in this repository.

By the end of this, you should have an app where you can see all the conversations available,
 create conversations, and lastly,  navigate to an indinvidual conversation and be able to see the messages
 in the conversation, write messages in the conversation,
and lastly, delete the conversation.

To get guidance on how to write your controllers, services etc,
check the [styling guide for AngularJS](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md)
## Getting started

1. Clone this repository.
2. Create a branch with your name and checkout the branch out, I will be looking at this to
review your code.
4. Install dependencies
5. Open the app in browser with our dear `http-server`
6. Go to the app.js file and instantiate the Angular module, do not forget to add 'onsen' as a
    dependency! This is important otherwise you will get an error when running the repository.
7. Please Read the whole spec below before. The instructions will be given after either way.

I have left my files there with deleted information and a bunch of TODOs, you may choose to
delete the and try to implement it yourself if you are comfortable enough. If not, follow along :)

Have Fun!
## MVC
As a reminder, we talked about the [Model-View-Controller](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)
 In this app, we will use one model, which will be our MessengerService,
here we will mock-up data which will simulate a server call. This model will serve
three controllers, the ConversationsController, the IndividualConversationController,
 and lastly, the NewConversationController. This controllers will be coupled with their
 respective view, and will control and sync the information between the model and the view.
 Here is a image of my directory tree: [tree](./images/image9.png)

Do not worry about the *.spec.js files for now. Those are the testing files.

## Views

To add your Onsen UI views the easy way visit: [Onsen Theme Roller](https://onsen.io/theme-roller/).
Pick OnsenUI version <=2.10.0 on the left as the version, which is the closest to what we have,
and choose the Patterns option. When you click on `show source` you will get the html and css
use for this pattern. You can sort of see what the html maps to
on the view (you should be looking inside the `<body>` tags), when implementing your own views
you may steal this code and add it to your apps. You will need to declare a css file with a
provided onsen css in the index.html file.

__Note__: I have provided  all of this components already, this is only if you want to change something
or you want to implement it yourself.
## Controllers
The controllers you may have seen online for angular may look like this.
```
angular.module('app')
    .controller('NameController',[ "$scope",function($scope){

    }]);
```
Where `$scope` is the object that holds the connection with the view. In the John Papa style guide,
we have,
```
(function() {
    var module = angular.module('app');
    module.controller('NameController', NameController);

    NameController.$inject = [];

    function NameController()
    {
        var vm = this; // vm is $scope

    }

})();

```

In this representation of Angular vm is the equivalent to scope and its what is coupled
in the view.

## MessengerService

I provided to you a start of this service plus a UserService which will mock the user
using the messaging app, you may navigate to this controller and put your name in.
Here is the header for my MessengerService:
```
(function(){
    var module = angular.module("messaging-app");

    module.service("MessengerService", MessengerService);
    MessengerService.$inject = ["UserService"];

    function MessengerService(UserService) {

        var conversations = [];
	    /**
	     *
	     * @type {{addConversation: addConversation, getConversations: getConversations, getConversationMessages: getConversationMessages, getConversationsFromServer: getConversationsFromServer}}
	     */
	    var service = {
            addConversation: addConversation,
            getConversations: getConversations,
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
		    ...
```
Here is the data I used to instantiate my conversations:[data.json](./data.json)
The API functions offered by this service are the following and should be self-explanatory.
```
addConversation: addConversation,
getConversations: getConversations,
sendMessage:sendMessage,
deleteConversation:deleteConversation,
getConversationById:getConversationById
```
They simply manipulate the conversations array, which happens to be our ground truth.
For array manipulations in JavaScript check: [Mozilla Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\


## Conversation Page:

This will come with its view, the `conversation.html` page, and its partner
the `conversationController.js`. This page acts as the root for the onsen navigator. See [navigator](https://onsen.io/v1/guide.html#page-navigation)
It will contain the list of conversations, a way to navigate to each individual conversation
 and a way to create new conversations.
For now ignore the right button on the toolbar for looking up conversations in this page.

Here is the heading for my controller.
```
   function ConversationsController(MessengerService){

    vm.conversations = [];
    vm.newConversation = newConversation;
    vm.goToConversation = goToConversation;
    vm.emptyConversations = true;
    initController();

    /////

    function initController() {
        vm.conversations = MessengerService.getConversations();

    ...
```
- __conversations__: This is an array that will have a copy of the conversations which
it gets from the MessengerService.
- __newConversation__: The right hand side toolbar button calls `vm.newConversation`.
This function will push a page with a lift animation. Check [page navigation](https://onsen.io/v1/guide.html#page-navigation)
for more details on this.
- __goToConversation__: This will push a page onto the navigator, called
`./views/messenger/individual-conversation.html`, the animation will the default
one. The parameters for the navigator will be the conversation you just tapped on.
To push and get parameters from an Onsen Navigator use:
- __emptyConversations__: Flag use to display or not display, `Empty Conversation`
  See [ng-show](https://docs.angularjs.org/api/ng/directive/ngShow) for this.

For pushing and getting parameters from page use the following code.

```
// To push
navi.pushPage('./views/...', {animation:<name>, param: conversation});

// To gather parameter, once you are in the next page.
var param = navi.getCurrentPage().options.param;
```

## New Conversation Page:

This page will create an empty conversation based on the name and image provided.
See [images](./images/) for more details.

Here is the headings for my controller file:

```
function NewConversationController(MessengerService){
    var vm = this;
    vm.checkFields = checkFields;
    vm.createConversation = createConversation;
    vm.imageUrl = "";
    vm.name = "";
    ...

```

- __vm.createConversation__: will be called the ServiceFunction with the right
parameters to create a conversation.
- __vm.checkFields__: This function will check and sanitize the angular
    [ng-input](https://docs.angularjs.org/api/ng/directive/input) fields that create the conversation and
    will disable the submit button if the conversation parameters are not proper (in this context
     proper means non-empty strings). It does this by using the [ng-disabled](https://docs.angularjs.org/api/ng/directive/ngDisabled) angular directive.

- __vm.imageUrl__: Will hold the imageUrl in the view, which will preview on the page using
the [ng-src](https://docs.angularjs.org/api/ng/directive/ngSrc) tag.
- __vm.name__: Will hold the name for the conversation and interact
 with the view via [ng-model](https://www.w3schools.com/angular/angular_model.asp)

## Individual Conversation Page

This page is entered upon tapping on a list item on the conversations view.
The parameter passed to this page will be either the conversation or the conversation
id. Here is the header for the controller:

```
    function IndividualConversationController(MessengerService) {
    	// TODO add the following functions.
        var vm = this;
        vm.conversation = {};
        vm.noMessages = true;
        vm.messageContent = "";
        vm.sendMessage = sendMessage;
        vm.deleteConversation = deleteConversation;

        ....

```

- __conversation__: Object containing the conversation that is passed via the navigator parameter
- __sendMessage__:  Calls the `MessengerService` to add a new message to the conversations array.
- __deleteConversation__: Removes a conversation from the conversations array and immediately pops the page.
                    back to the conversation list page.
- __messageContent__: This holds the user input for the new message and is attached to the view via a textarea
                        and ng-model. Uses [ng-repeat](https://docs.angularjs.org/api/ng/directive/ngRepeat)
                        to iterate through messages, and [<ons-list></ons-list>](https://onsen.io/v1/reference/ons-list.html) to display them.


## Suggested steps

At this point you should have a good idea of what you need to do.
I left TODO's through the code for you to check, webstorm has a TODO list that parses through the files and shows you the TODO.
It should be a little tab at the bottom of the IDE.
You are fre to implement it in which ever order you see fit.
This is how I would do it,
1. MessengerService
2. ConversationController
3. NewConversationController
4. IndividualConversationController

## Testing. (you may skip his step and do it later)

Let's now install the Karma framework for unit testing.
1. Run
 ```
 npm install karma karma-jasmine jasmine-core karma-chrome-launcher karma-junit-reporter --save-dev
 npm instal -g karma-cli
 bower install angular-mocks#1.4.14 --save-dev

 ```
 Notice here again that this is an example of a development dependency, thus
 the `--save-dev` flag.
2. . Setup for AngularJS testing environment. To do this, run `$karma init karma.conf.js`,
choose the Jasmine Framework (AngularJS Framework, Require.js no (Since we are dealing
with a browser and Require.js is for server side JavaScript, a.k.a Node.js). Then go
through the rest of the default options choosing Chrome as your browser. This
will create a `karma.conf.js` file from the options you provided. Below is
my configuration.

```
// Karma configuration
// Generated on Sun May 06 2018 14:08:09 GMT-0400 (EDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: 'app',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
	    'lib/bower_components/angular/angular.min.js',
	    'lib/bower_components/angular-mocks/angular-mocks.js',
	    'lib/bower_components/OnsenUI/js/onsenui.js',
    	'js/app.js',
        'js/controllers/**/*.js',
	    'js/services/**/*.js'

	    // 'js/**/*.js'
    ],


    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    // reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],
	  plugins: [
		  'karma-chrome-launcher',
		  'karma-jasmine',
		  'karma-junit-reporter'
	  ],
	  junitReporter: {
		  outputFile: 'test_out/unit.xml',
		  suite: 'unit'
	  },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
};
```
This is the configuration file for the karma unit testing framework. Here we are specifying
things like our files that we want to test, the browser we want to test in, and the plugins
that make this possible. The `karam-chrome-plugin` for instance will allow you to run your tests
in Chrome automatically, `karma-jasmine` is the plugin that provides functions to interact
with the AngularJS environment. For more information look at the [Karma tutorial](http://www.bradoncode.com/blog/2015/05/19/karma-angularjs-testing/),
[AngularJS testing](https://docs.angularjs.org/guide/unit-testing)
3. Add the following key,value pair to the scripts object in your package.json replacing
the value currently present:
```
    scripts:{
        "test": "karma start karma.conf.js"
    }
```
This will allow you to run your tests as `$npm run test`. For now, do not worry too much
about testing. This will be a topic for later.

## Too easy? Advanced Challenge

Replace the garbage button in the individual conversation page and create a new
 'contact' view instead.
This will be a summary page for that user which will show its picture, name, and  last message,
it will also create a __red__ button to delete the conversation from there.
You will need to create a controller and its accompanying view, then add this paths to the
index.html.
## Finished?

Great! Please create a new remote branch with your name as firstname_lastname,
[pushing to remote](https://help.github.com/articles/pushing-to-a-remote/)
I will review your branches and give you notes the day after or later the same day.

## Next Steps
1. Test and document our code
2. Integrate Firebase into the equation.
3. Have real-time conversation with your peers :-)


