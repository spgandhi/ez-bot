angular.module('basehack').controller('Home', ['$scope', '$state' ,function ($scope, $state) {
	console.log('ME Project');

	if($scope.currentUser)
		$state.go('profile');
		
}])