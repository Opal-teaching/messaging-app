(function(){
	'use strict';

	angular
		.module("messaging-app")
		.factory("UserService", UserService);

	UserService.$inject = [];

	function UserService() {

		let user = "David Herrera";

		let service = {
			getUser: getUser
		};
		return service;

		//////////////////////////////

		function getUser() {
			return user;
		}
	}
})();