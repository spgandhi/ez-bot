angular.module('basehacks', [
    angularMeteor
  ])

  .controller('main', ['$scope', function($scope) {
    $scope.text = "hello wold";
  }]);