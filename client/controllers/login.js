angular.module('basehack').controller('Login', ['$scope', '$state', 'toastr', function ($scope, $state, toastr) {

	if($scope.currentUser)
		$state.go('profile');
			
	$scope.login = function(){
			Meteor.loginWithPassword($scope.user.email, $scope.user.password, function(err){
				if(err)
					toastr.error(err.reason, "Error");
				else{
					toastr.success('Welcome Back!', 'Successs');
					$state.go('profile');
				}
			})
	}
}])