angular.module('app.routes', ['ionicUIRouter'])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('home', {
    url: '/page5',
    templateUrl: 'templates/home.html',
    controller: 'homeCtrl'
  })

  .state('events', {
    url: '/page6',
    templateUrl: 'templates/events.html',
    controller: 'eventsCtrl'
  })

  .state('messages', {
    url: '/page7',
    templateUrl: 'templates/messages.html',
    controller: 'messagesCtrl'
  })

  .state('tabsController.survey', {
    url: '/page8',
    views: {
      'tab1': {
        templateUrl: 'templates/survey.html',
        controller: 'surveyCtrl'
      }
    }
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.results'
      2) Using $state.go programatically:
        $state.go('tabsController.results');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab2/page9
      /page1/tab3/page9
  */
  .state('tabsController.results', {
    url: '/page9',
	params: {
		name: "",
		favoritepresenter: "",
		favoriteevent: ""		
},
    views: {
      'tab2': {
        templateUrl: 'templates/results.html',
        controller: 'resultsCtrl'
      },
      'tab3': {
        templateUrl: 'templates/results.html',
        controller: 'resultsCtrl'
      }
    }
  })

  .state('tabsController.search', {
    url: '/page10',
    views: {
      'tab3': {
        templateUrl: 'templates/search.html',
        controller: 'searchCtrl'
      }
    }
  })

  .state('saved', {
    url: '/page11',
    templateUrl: 'templates/saved.html',
    controller: 'savedCtrl'
  })

  .state('lostAndFound', {
    url: '/page12',
    templateUrl: 'templates/lostAndFound.html',
    controller: 'lostAndFoundCtrl'
  })

  .state('login', {
    url: '/page13',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signup', {
    url: '/page14',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('mapAndHotelInformation', {
    url: '/page15',
    templateUrl: 'templates/mapAndHotelInformation.html',
    controller: 'mapAndHotelInformationCtrl'
  })

  .state('event', {
    url: '/page16',
	params: {
		eventId: ""		
},
    templateUrl: 'templates/event.html',
    controller: 'eventCtrl'
  })

  .state('savedEvent', {
    url: '/page17',
	params: {
		eventId: ""		
},
    templateUrl: 'templates/savedEvent.html',
    controller: 'savedEventCtrl'
  })

$urlRouterProvider.otherwise('/page13')

  

});