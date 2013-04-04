'use strict';

/* Controllers */

// The main controller for the front page
function AppCtrl($scope, $http) {
 	// setDefaultValues($scope);
 	$scope.create = {};
 	$scope.update = {};
 	$scope.activeUser;

 	$http({method: 'GET', url: '/api/users/'}).
 	success(function(data, status, headers, config) {
 		$scope.users = data.users;
 	}).
 	error(function(data, status, headers, config) {
 		$scope.name = 'Error!'
 	});
 	$scope.clickUser = function (userid) {
 		$http({method: 'GET', url: '/api/users/' + userid}).
 		success(function(data, status, headers, config) {
 			$scope.userinfo = data.user.description;
 			$scope.username = data.user.name;
 		}).
 		error(function(data, status, headers, config) {
 			$scope.userInfo = 'Error!'
 		});
 	}
 	$scope.editUser = function (username, userdescription, userid) {
 		$scope.activeUser = userid;
 		$scope.update.name = username;
 		$scope.update.description = userdescription;
 	}
 	$scope.deleteUser = function (idx) {
 		var userToDel = $scope.users[idx];

 		$http({method: 'DELETE', url: '/api/users/' + userToDel._id}).
 		success(function(data, status, headers, config) {
 			$scope.users.splice(idx,1);
 		}).
 		error(function(data, status, headers, config) {
 			$scope.userInfo = 'Error!';
 		});
 	}
 	$scope.createUser = function () {
 		$http({method: 'POST', url: '/api/users/', data: $scope.create}).
 		success(function(data, status, headers, config) {
			// Typ såhär
			$scope.users.push(data);
		}).
 		error(function(data, status, headers, config) {
 			$scope.userInfo = 'Error!'
 		});
 	}
 	$scope.updateUser = function () {
 		$http({method: 'PUT', url: '/api/users/' + $scope.activeUser, data: $scope.update}).
 		success(function(data, status, headers, config) {
 			data._id = $scope.activeUser;
 			$scope.users = updateModel(data, $scope.users);
 		}).
 		error(function(data, status, headers, config) {
 			$scope.userInfo = 'Error!'
 		});
 	}
 }

 function updateModel(item, modelList) {
 	for(var i = 0; i < modelList.length; i++) {
 		if(modelList[i]._id == item._id) {
 			modelList[i] = item;
 		}
 	}
 	return modelList;
 } 

 function MyCtrl1() {}
 MyCtrl1.$inject = [];


 function MyCtrl2() {
 }
 MyCtrl2.$inject = [];
