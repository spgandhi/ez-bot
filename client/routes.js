angular.module('basehack').config(function($urlRouterProvider, $stateProvider, $locationProvider){

  $stateProvider
    
    .state('home', {
      url: '/home',
      templateUrl: 'client/views/home.html',
      data: {
        pageTitle: 'Dashboard',
        requireLogin: false,
        onlySuperAdmin: false
      },
      controller: 'Home'  
      
    })

    .state('register', {
      url: '/register',
      templateUrl: 'client/views/register.html',
      data: {
        requireLogin: false,
        onlySuperAdmin: false
      },
      controller: 'Register'
    })

    .state('profile', {
      url: '/profile',
      templateUrl: 'client/views/profile.html',
      data: {
        requireLogin: true,
        onlySuperAdmin: false
      },
      controller: 'Profile'
    })

 
    .state('questions', {
      url: '/profile/questions',
      templateUrl: 'client/views/questions.html',
      data: {
        requireLogin: true,
        onlySuperAdmin: false
      },
      controller: 'Questions'
    })

    .state('login', {
      url: '/login',
      templateUrl: 'client/views/login.html',
      data: {
        requireLogin: false,
        onlySuperAdmin: false
      },
      controller: 'Login'
    })

    .state('bot', {
      url: '/bot',
      templateUrl: 'client/views/bot.html',
      data: {
        requireLogin: false,
        onlySuperAdmin: false
      },
      controller: 'Bot'
    })

  $urlRouterProvider.otherwise("/home");
});