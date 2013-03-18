'use strict';

/* Controllers */

function UserCtrl($scope, $http) {
  $scope.phones = [
    {"name": "Nexus S",
     "snippet": "Fast just got faster with Nexus S.",
     "age": 0},
    {"name": "Motorola XOOM™ with Wi-Fi",
     "snippet": "The Next, Next Generation tablet.",
     "age": 1},
    {"name": "MOTOROLA XOOM™",
     "snippet": "The Next, Next Generation tablet.",
     "age": 2}
  ];

  $scope.dropdowns = [
    {"value": "name",
      "name": "Alphabetical"
    },
    {"value": "age",
      "name": "Newest"
    }
  ]
  $scope.orderProp = 'age';
}
