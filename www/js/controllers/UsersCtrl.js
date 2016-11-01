'user strict';

app.controller('UsersCtrl', ['$scope','usersFactory', '$timeout', '$interval',function($scope, usersFactory, $timeout, $interval){
	$scope.users = [];

	/**
	 * @name getUsers
	 * @description populate the user's list
	 */
	$scope.getUsers = function() {
		usersFactory.getUsers()
			.then(
				function(resp){
					$scope.users = resp.data.results;
				},
				function(reason){
					console.log("ERROR! ", reason);
				}
			);
	};

	/**
	 * @name sendUsers
	 * @description send all user's list
	 */
	$scope.sendUsers = function() {
		usersFactory.sendUsers($scope.users);
	};

	/**
	 * @name sendUser
	 * @param  {Object} user data
	 * @description send only one user
	 */
	$scope.sendUser = function(user) {
		usersFactory.sendUser(user);
	};

}]);