angular.module('basehack').controller('Bot', ['$scope', '$state' ,function ($scope, $state) {
	
	Array.prototype.containsArray = function ( array /*, index, last*/ ) {

	    if( arguments[1] ) {
	        var index = arguments[1], last = arguments[2];
	    } else {
	        var index = 0, last = 0; this.sort(); array.sort();
	    };

	    return index == array.length
	        || ( last = this.indexOf( array[index], last ) ) > -1
	        && this.containsArray( array, ++index, ++last );

	};

	console.log('Helo world');

	$scope.messages = new Array();
	$scope.bot = '';

	$scope.newMessage = function(msg){
		newMsg = {};
		newMsg.message = msg;
		newMsg.user = 'user';
		$scope.messages.push(newMsg);
		newMsg = {};
		$scope.botProcess(msg);
		$scope.tempMsg = '';
	}

	$scope.botProcess = function(msg){
		

		if( msg.indexOf("connect ") > -1){
			
			bot = msg.split(' ')[1];

			$scope.messages.push({message:'Connecting to ' + bot + ' ...', user:'bot'});

			Meteor.call('checkBot', bot,function(err, result){

				console.log(result);

				if(result){
					Meteor.subscribe('questions', bot, function(){
						$scope.bot = bot;
						$scope.messages.push({message:'Connected to ' + bot + ' ...', user:'bot'});
						$scope.$digest();
						Meteor.call('getGreetings', bot, function(err, result){
							console.log(result);
							$scope.messages.push({message: result.profile.greetings, user: 'bot'})
							return;	
						})
						
					});
					
				} else{
					$scope.messages.push({message: 'The bot does not exist. Try a different or reigster a new one.' , user: 'bot'});
					return false;
				}
			})
			
		}else if( $scope.bot == '' ){
			newMsg = {
				message: "Please connect to a bot using 'connect botname'",
				user: 'bot'
			}
			$scope.messages.push(newMsg);
			return;
		} else {
			questions = Questions.find({bot: $scope.bot}).fetch();
			console.log(questions);

			resp = 'Sorry. Command not found';

			angular.forEach(questions, function(value, key){
				
				if(value.type == 0 && value.question == msg){
					resp = value.response;
					return;
				}else if(value.type==1 && msg.split(' ').containsArray(value.question)){
					resp = value.response;
					return;
				}else{
					resp = 'Sorry. Command not found';
				}

			})	

			$scope.messages.push({message: resp, user: 'bot'});
		}
			
	}
				
	

}])