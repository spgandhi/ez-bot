angular.module('basehack').controller('Main', ['$scope', '$state' ,function ($scope, $state) {
		
	$scope.logout = function(){
		Meteor.logout(function(){
			$state.go('home');
		});
	}
}])

angular.module('basehack').run(function ($rootScope, $location) {

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

    var requireLogin = toState.data.requireLogin;
    
    if (requireLogin && !Meteor.userId() ) {
      $location.path('/login');
    }

    var onlySuperAdmin = toState.data.onlySuperAdmin;
    if( Meteor.user() && onlySuperAdmin ){
      if(Meteor.user().emails[0].address != 'spgandhi@live.com')
        $location.path('/home');
    }

  });

});