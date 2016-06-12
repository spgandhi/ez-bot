angular.module('basehack').controller('Questions', ['$scope', 'toastr', '$state', function ($scope, toastr, $state) {

	$scope.newQuestion = '';

	Meteor.subscribe("questions", Meteor.userId(), function(){
		console.log(Meteor.user().profile.botname);
		$scope.questions = Questions.find({bot: Meteor.user().profile.botname}).fetch();
		$scope.$digest();
		// console.log($scope.questions);
	})

	$scope.addQuestion = function(){	

		if(!$scope.newQuestion.uniqueName || $scope.newQuestion.uniqueName == ''){
			toastr.error('Please enter the unique name', 'Error');
			return;
		}

		if(!$scope.newQuestion.type || $scope.newQuestion.type == ''){
			toastr.error('Please select the question type', 'Error');
			return;
		}

		if( $scope.newQuestion.type == 0 && (!$scope.newQuestion.question || $scope.newQuestion.question == '' ) ){
			toastr.error('Please enter the question', 'Error');
			return;
		}

		if( $scope.newQuestion.type == 1 ){		
			tags = $('#questionsTags').tokenfield('getTokensList', ',').split(", ");

			if(tags.length == 0){
				toastr.error("Please enter tags", "Error");
				return;
			}
			
			$scope.newQuestion.question = tags;
		}

		if(!$scope.newQuestion.response || $scope.newQuestion.response == '' ){
			toastr.error('Please enter the response', 'Error');
			return;
		}

		$scope.newQuestion.bot = $scope.currentUser.profile.botname;

		Questions.insert($scope.newQuestion, function(err, _id){
			if(!err){
				toastr.success('Added', 'Success');
				$scope.newQuestion = {};
			}
		});
	}

}])