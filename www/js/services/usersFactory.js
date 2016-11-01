'use strict';

app.factory('usersFactory', ['$http', '$timeout', 'MiddleWare', function($http, $timeout, MiddleWare){
	var sendTime = 1000;
	var userLimit = 50;
	return {
		getUsers: getUsers,
		sendUsers: sendUsers,
		sendUser: sendUser
	};

	/**
	 * @name _parseUser
	 * @param {Object} user info
	 * @return {Object} newUser user with new format
	 */
	function _parseUser(user) {
		var newUser = {
			"thingData": {
				"name": user.name.first,
				"eMail": user.email,
				"Apellido": user.name.last,
				"Empresa": user.location.city,
				"Cargo": user.location.postcode
			}
		};
		return newUser;
	}

	/**
	 * @name getUsers
	 * @description get all users using randomuser API
	 * @return {Object} list of users
	 */
	function getUsers() {
		return $http.get('https://randomuser.me/api/?results='+userLimit);
	}

	/**
	 * @name sendUser
	 * @param {Object} user data
	 * @description send one user to middleware
	 */
	function sendUser(user) {
		var item = _parseUser(user);
		$http({
			method: 'post',
			url: MiddleWare.Host,
			data: item,
			headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    	},
    	params: {
    		token: MiddleWare.Token
    	}
		});
	}


	/**
	 * @name sendUsers
	 * @param {Array} userList 
	 * @description send all user's List
	 */
	function sendUsers(userList) {
		for(var i=1; i<=userList.length; i++){
			var user = _parseUser(userList[i-1]);
			(function(user){
	      $timeout(function(){
		
					$http({
							method: 'post',
							url: MiddleWare.Host,
							data: user,
							headers: {
			        'Content-Type': 'application/json',
			        'Access-Control-Allow-Origin': '*'
			      	},
			      	params: {
			      		token: MiddleWare.Token
			      	}
						});
				},sendTime*i);
			})(user);
		}
	}
}]);