angular.module('basehack').controller('Profile', ['$scope', 'toastr', '$state', '$rootScope', function ($scope, toastr, $state, $rootScope) {
			

	$scope.update = function(){

		Meteor.users.update({_id: $scope.currentUser._id},{$set: {profile:$scope.currentUser.profile}}, function(err){
			if(err)
				toastr.error(err, 'Error');
			else
				toastr.success('Profile updated!', 'Success');
		});
	}

}])