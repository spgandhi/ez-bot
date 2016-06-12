Meteor.publish('findUser', function(options){
	console.log(options);
	console.log(Meteor.users.find(options).fetch());
	return Meteor.users.find(options);
})

Meteor.publish('questions', function(botName){
	console.log(botName);
	return Questions.find({bot: botName});
})

Meteor.methods({
	checkBot: function(botName){
				console.log(botName);
				if (Meteor.users.find({'profile.botname': botName }).fetch().length == 1){
					console.log(Meteor.users.find({'profile.botname': botName }).fetch().length);
					return true;
				}else{
					return false;
				}
			},
	getGreetings: function(botName){
		greetings = Meteor.users.findOne({'profile.botname' : botName}, {"profile.greetings":1, _id:0});
		console.log(greetings);
		return greetings;
	}	
})