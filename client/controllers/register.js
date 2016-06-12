angular.module('basehack').controller('Register', ['$scope', 'toastr', '$state', function ($scope, toastr, $state) {
	
	if($scope.currentUser)
		$state.go('profile');
			
	$scope.registerMe = function(){

		if($scope.newUser.profile.name ==""){
			toastr.error('Enter Name', 'Name');
			return;
		}

		if(!$scope.newUser.password || $scope.newUser.password.length<8){
			toastr.error('Password length should be greater than 8', 'Password');
		}

		if(!$scope.newUser.email || $scope.newUser.email==""){
			toastr.error('Enter Email ID', 'Email');
			return;
		}
		
		if($scope.newUser.email.indexOf('@')==-1 || $scope.newUser.email.indexOf('.')==-1) {
			toastr.error('Enter valid Email ID', 'Email');
			return;
		}

		if(!$scope.newUser.profile.botname || $scope.newUser.profile.botname == ""){
			toastr.error('Enter Botname', 'Botname');
			return;
		}

		$scope.newUser.profile.role = "user";

		Accounts.createUser({email: $scope.newUser.email, password: $scope.newUser.password, profile:$scope.newUser.profile}, function(err){
			if(err)
				toastr.error(err.reason, 'Error');
			else{
				toastr.success('Registration Successful', 'Success');
				$scope.newUser = {};
				$state.go('home');
			}
		});
	}
}])