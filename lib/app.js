if(Meteor.isClient){
	var app = angular.module('basehack',['angular-meteor', 'ui.router', 'toastr', 'ngFileUpload', 'angular-meteor.auth']);
}