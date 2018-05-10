(function () {
	var module = angular.module("messaging-app");
	module.service("UserService",UserService);
	UserService.$inject = [];
	function UserService() {
		var user = "David Herrera";
		var service = {
			getUser: getUser
		};
		return service;
		/////////////////
		function getUser() {
			return user;
		}

	}
})();