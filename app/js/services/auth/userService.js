(function () {
	var module = angular.module("messaging-app");
    /**
     * @ngdoc service
     * @name messaging-app.service:UserService
     * @description User authentication information
     */
	module.service("UserService",UserService);
	UserService.$inject = [];
	function UserService() {
        /**
		 * @ngdoc property
		 * @name messaging-app.service:UserService#user
		 * @propertyOf messaging-app.service:UserService
		 * @description Username
         * @type {string}
         */
		var user = "David Herrera";

        /**
         * @type {{getUser: (function(): string)}}
         */
		var service = {
			getUser: getUser
		};
		return service;
		/////////////////

        /**
         * @ngdoc method
         * @name messaging-app.service:UserService#getUser
         * @methodOf messaging-app.service:UserService
         * @description getter for the user name
         * @returns {string} user's name
         */
		function getUser() {
			return user;
		}

	}
})();