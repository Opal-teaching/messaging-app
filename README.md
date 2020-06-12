# Messaging App

The goal of this mini-project is to create a messaging app using the Opal technology stack.
The app will have three pages:
1. A page with a list of conversations: [Conversation List](./images/image1.png).
2. A page to create new conversations: [Create Conversation](./images/image3.png).
3. A conversation page to send messages: [Conversation](./images/image2.png).

For more details on the different views of this app, go through the images folder in this repository.

By the end of this assignment, you should have an app where you can see all available conversations, 
create conversations, navigate to an individual conversation, see the messages in the conversation, 
write new messages, and delete a conversation.

# Resources

To get guidance on how to write your controllers, services, etc., consult the 
[style guide for AngularJS](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md).

# Instructions

1.  Clone this repository.

2.  Create a branch (off of master) with your name. As you work on this assignment, make commits to this 
    branch. This will help you become more comfortable using Git, which will be important when working with Opal.

3.  Run `npm install`.

4.  Run `npm run start`.

5.  Read the sections below before working on the app. Then, follow the TODOs listed in the different app files.

Have Fun!

## MVC

As a reminder, we talked earlier about the [Model-View-Controller](https://www.codecademy.com/articles/mvc) design pattern.
In this app, we will use one model, the MessengerService which currently contains mock-up data. This model will serve
three controllers: the ConversationsController, the IndividualConversationController,and the NewConversationController. 
These controllers will each be coupled with their respective view, and will control and sync the information between the 
model and the view.

Don't worry about the *.spec.js files for now. Those are testing files.

## Views

To add your own Onsen UI components to your views, visit: [Onsen 1 API Reference](https://onsen.io/v1/reference/javascript.html).
Each component will have example HTML that you can use in your app.
Any CSS you need comes from files imported in `app.js`. These can be built-in Onsen files, such as:
```
import "onsenui/css/onsen-css-components-blue-basic-theme.css";
```
or custom files (added to the app's css folder), such as:
```
import "../css/conversations.css";
```

__Note__: Most of the necessary components have been provided to you already. This is only if you want to change something 
or if you want to implement it yourself.

## Controllers

The controllers you may have studied online for AngularJS may look like this:
```
angular.module('app')
    .controller('NameController',[ "$scope",function($scope){

    }]);
```
Here, `$scope` is the object that holds the connection with the view. In the John Papa style guide,
we instead have:
```
(function() {
    angular
        .module('app')
        .controller('NameController', NameController);

    NameController.$inject = [];

    function NameController() {
    
        let vm = this; // vm is equivalent to $scope

    }
})();
```

In this AngularJS style, vm is the equivalent of scope and acts as the link to the view.

## MessengerService

I provided to you a start of this service plus a UserService which will mock the user
using the messaging app. You may navigate to this service and put your name in (be sure to also update the name 
in the mock data in MessengerService).

The API functions offered by this service are the following. Short explanations for these functions are given in the code.
```
addConversation: addConversation,
getConversations: getConversations,
getConversationsFromServer: getConversationsFromServer,
sendMessage: sendMessage,
deleteConversation: deleteConversation,
getConversationById: getConversationById
```
These functions simply manipulate the conversations array, which is our ground truth of data in this service.
For array manipulations in JavaScript check: 
[Mozilla Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).

## Conversation List

The conversation list is made up of the `conversation.html` view and of`conversationsController.js`. 
This page acts as the root for the [Onsen navigator](https://onsen.io/v1/guide.html#page-navigation), defined in index.html:
```
<ons-navigator var="navi" page="./views/messenger/conversations.html"></ons-navigator>
```
It will contain the list of conversations, a way to navigate to each individual conversation 
and a way to create new conversations.

This page's controller contains the following attributes and functions:

  - `conversations`: An array reference to the conversations from the MessengerService.
  - `noConversations`: Flag use to display or not display `No conversations`. 
    See [ng-show](https://www.w3schools.com/angular/ng_ng-show.asp) for this.
  - `newConversation`: A toolbar button calls this function.
    It will push a page with a lift animation where new conversations can be created. 
    Check [page navigation](https://onsen.io/v1/guide.html#page-navigation) for more details on pushing a page.
  - `goToConversation`: This will push a page with the default animation to display a conversation and allow the user 
    to send messages. While pushing the page, the conversation that was tapped on will be passed as a parameter.
    To push a page with parameters, and to read those parameters in the new page, use:
    ```
    // To push
    navi.pushPage('./views/...', {animation: <name>, myParam: conversation});
    
    // To read the parameter in the other page's controller.
    var param = navi.getCurrentPage().options.myParam;
    ```

## New Conversation Page

This page will create an empty conversation based on the name and image provided.
See [images](./images/) for more details.

This page's controller contains the following attributes and functions:

  - `imageUrl`: Will hold the imageUrl in the view, which will preview on the page using
    the [ng-src](https://www.w3schools.com/angular/ng_ng-src.asp) directive.
  - `name`: Will hold the name of the conversation recipient, connected to the view via 
    [ng-model](https://www.w3schools.com/angular/angular_model.asp).
  - `checkFields`: This function will check and sanitize the [ng-input](https://docs.angularjs.org/api/ng/directive/input) 
    fields used to create the conversation and will disable the submit button if the conversation parameters are not valid 
    (in this context, valid means non-empty strings). It does this by using the 
    [ng-disabled](https://www.w3schools.com/angular/ng_ng-disabled.asp) angular directive.
  - `createConversation`: Will call the appropriate function in `MessengerService` with the right
    parameters to create a new conversation.
  
## Individual Conversation Page

This page is displayed upon tapping on a list item in the conversation list view.
The parameter passed to this page can be either the conversation or the conversation id.

This page's controller contains the following attributes and functions:

  - `conversation`: Conversation object displayed on this page.
  - `noMessages`: Flag use to display or not display `No messages`.
  - `sendMessage`: Calls `MessengerService` to add a new message to the conversations array.
  - `deleteConversation`: Removes a conversation from the conversations array and immediately pops the page
    (to go back to the conversation list page).
  - `messageContent`: This holds the user input for the new message and is attached to the view via a text input and ng-model.

## Suggested steps

At this point, you should have a good idea of what needs to be implemented. TODOs were left in the code for you to follow.
If you're using Webstorm, there is a [TODO feature](https://www.jetbrains.com/help/webstorm/using-todo.html) that parses 
the files and shows you the list of all comments marked with `TODO` (tab at the bottom of the IDE). You can use this to 
easily find what you need to complete. Please note that you're free to implement any of these tasks creatively or in 
different ways than those described.

Here's a suggested order of implementation:
1. ConversationController
2. NewConversationController
3. IndividualConversationController
4. MessengerService

## Bonus Features

Here are some suggested ideas that you can follow if you want to create a more interesting project:
  - Use what you learned in `firebase-simple-app` to connect your messaging app to Firebase. For convenience, Firebase is already 
    added as a dependency and connected to Webpack. You'll just need to do the following additional steps: 
    - Add Firebase configurations to `app.js` and use them to call `firebase.initializeApp`.
    - Modify `getConversationsFromServer` in `MessengerService` to initialize the conversations array from Firebase instead of 
      from `mockConversationsOnServer`, and set it up to listen for changes in the conversations.
    - Add a refresh button or a looping auto-refresh feature to the conversation list and conversation page to check for new updates 
      in `MessengerService`.
  
  - Add functionality to change the information stored in UserService. This can be done in an existing view/controller or by 
    creating a new view and controller for this purpose.
  
  - If you've done the first two bonus features, your app should work as a real messaging app. Run two instances of the app with 
    a friend to test it out, or run two instances of the app locally in two terminals by specifying a different port in 
    the second one. For example:
    ```
    npm run start
    ```
    ```
    npm run start -- --port=9002
    ```
    The first instance will use port 9001, which is specified in `webpack.config.js` under `devServer`. In the second instance, 
    the first `--` allows us to pass extra flags to the npm script. The second `--` is specifying the `port` flag used by webpack 
    `devServer` to run the instance; in this case, port 9002. This is necessary because only one application can run at a one 
    time in a given port.
    <br><br>
    Then, input two different names to UserService, and start a conversation between the two apps.
  
  - Add an input box above the conversation list to search for a conversation. For example:
    ```
    <ons-list-item style="margin-top:10px">
        <input type="search" value="" placeholder="Search" class="search-input" ng-model="vm.searchConversationString">
    </ons-list-item>
    ````
    Pair this with a filter on the conversations to only display those conversations that have content matching the search string:
    ```
    <ons-list-item ng-repeat="conversation in vm.conversations | filter: vm.searchConversationString">
    ```
    The "filter" filter can be parameterized more if needed. See here: 
    [filter filter](https://www.w3schools.com/angular/ng_filter_filter.asp).
  
  - Add testing to your code (see section below).

### Testing (Advanced)

__Note__: This section has not been updated and tested since 2018. In particular, we don't use `bower_components` anymore.
You may need to try a few things out to get everything working.

Let's install the Karma framework for unit testing.
1. Run
 ```
 npm install karma karma-jasmine jasmine-core karma-chrome-launcher karma-junit-reporter --save-dev
 npm instal -g karma-cli
 npm install angular-mocks@1.4.14 --save-dev

 ```
 Notice here again that this is an example of a development dependency, thus
 the `--save-dev` flag.
2. Setup the AngularJS testing environment. To do this, run `karma init karma.conf.js`, and
choose the Jasmine Framework (AngularJS Framework, Require.js no (Since we are dealing
with a browser and Require.js is for server side JavaScript, a.k.a Node.js). Then go
through the rest of the default options, choosing Chrome as your browser. This
will create a `karma.conf.js` file from the options you provided. Below is
my configuration.

```
// Karma configuration
// Generated on Sun May 06 2018 14:08:09 GMT-0400 (EDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: 'src',


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
This is the configuration file for the karma unit testing framework. Here, we are specifying
things like our files that we want to test, the browser we want to test in, and the plugins
that make this possible. The `karma-chrome-plugin` for instance will allow you to run your tests
in Chrome automatically. `karma-jasmine` is the plugin that provides functions to interact
with the AngularJS environment. For more information look at the 
[Karma tutorial](http://www.bradoncode.com/blog/2015/05/19/karma-angularjs-testing/) and
[AngularJS testing](https://docs.angularjs.org/guide/unit-testing)

3. Add the following key/value pair to the scripts object in your package.json, replacing
the value currently present:
```
    scripts:{
        "test": "karma start karma.conf.js"
    }
```
This will allow you to run your tests as `$npm run test`.

You can then use the documentation mentioned above as guidance to fill out some test files. 
The beginnings of a test file are provided under `src/js/controllers/messenger/conversationsController.spec.js`,
and another empty file can be found under `src/js/services/messenger/messengerService.spec.js`.

## Finished?

Great! Finish committing all your changes, and push your branch to remote.

You did it! Congratulations :)
