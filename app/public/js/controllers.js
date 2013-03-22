'use strict';

/* Controllers */

// The main controller for the front page
function AppCtrl($scope, $http) {
	$http({method: 'GET', url: '/api/users/'}).
	success(function(data, status, headers, config) {
		$scope.users = data.users;
	}).
	error(function(data, status, headers, config) {
		$scope.name = 'Error!'
	});
	$scope.clickUser = function (userid) {
		console.log('userid',userid);
		$http({method: 'GET', url: '/api/users/' + userid}).
		success(function(data, status, headers, config) {
			$scope.userinfo = data.user.description;
		}).
		error(function(data, status, headers, config) {
			$scope.userInfo = 'Error!'
		});
	}
	$scope.deleteUser = function (idx) {
		var userToDel = $scope.users[idx];
		console.log('userToDel',userToDel);
		$http({method: 'DELETE', url: '/api/users/' + userToDel._id}).
		success(function(data, status, headers, config) {
			console.log('innan splice',$scope.users);
			$scope.users.splice(idx,1);
			console.log('success');
			console.log('efter splice',$scope.users);
		}).
		error(function(data, status, headers, config) {
			$scope.userInfo = 'Error!'
		});
	}
}

function MyCtrl1() {}
MyCtrl1.$inject = [];


function MyCtrl2() {
}
MyCtrl2.$inject = [];
