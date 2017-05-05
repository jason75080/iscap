angular.module('app.controllers', [])
     
.controller('menuCtrl', ['$scope', '$stateParams', '$ionicUser', '$ionicAuth', '$state', '$ionicSideMenuDelegate', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicUser, $ionicAuth, $state, $ionicSideMenuDelegate) {
  
    // Updated on 1/9/2017 to fix issues with logging
    // out and back in, as well as history issues with side menu + tabs.
    function checkLoggedIn(){
        if ($ionicAuth.isAuthenticated()) {
            // Make sure the user data is going to be loaded
            $ionicUser.load().then(function() {
            $scope.userData = $ionicUser.details;
            });
        }else{
            $scope.userData = {}; 
        }
    }
    
    checkLoggedIn();
    
    $scope.$on('login_change', checkLoggedIn);

    $scope.logout = function(){
        $ionicAuth.logout();
        // Updated on 1/9/2017 to make sure the menu closes when
        // you log out so that it's closed if you log back in.
        $ionicSideMenuDelegate.toggleLeft(false);
        $state.go('login');
    };
}])
   
.controller('homeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('eventsCtrl', ['$scope', '$stateParams', 'ScheduleService', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, ScheduleService, $state) {
    
    
    
    $scope.events = ScheduleService.events;
    
    console.log("From Events.js" + $scope.events.length);
    
    $scope.data = {
        search: ''
    };
    
    $scope.showSearch = false;
    $scope.changeSearch = function(){
        $scope.showSearch = !$scope.showSearch;
        $scope.data = {
            search: ''
        };
        $scope.search();
    };

    $scope.search = function(){
        var s = $scope.data.search.toLowerCase();
        
        if (s === ''){
          $scope.events = ScheduleService.events;
          return;
      }
      
      $scope.events = $scope.events.filter(function(event){
        if (event.eventTitle.toLowerCase().indexOf(s) > -1 || event.mealType.toLowerCase().indexOf(s) > -1 || event.eventType.toLowerCase().indexOf(s) > -1 || event.room.toLowerCase().indexOf(s) > -1)
        {
            return true;
        } 
        return false;
      });
    };
    
    //$scope.goToEvent = function(event){
      //  $state.go('event', event);
    //};
}])
   
.controller('messagesCtrl', ['$scope', '$stateParams', '$firebaseArray', '$ionicUser', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $firebaseArray, $ionicUser) {
    
    $scope.data = {
        'title': '',
        'text': '',
        'url': ''
    };
    
      var ref = firebase.database().ref().child("message");
      // create a synchronized array
      $scope.messages = $firebaseArray(ref);
      
      // add new items to the array
      // the message is automatically added to our Firebase database!
      $scope.addMessage = function() {
        $scope.messages.$add({
          title: $scope.data.title,
          messageText: $scope.data.text,
          link: $scope.data.url,
          dataTime: Date.now(),
          photo: '',
          messageId: $scope.messages.length + 1,
          category: 'general',
          email: $ionicUser.details.email,
          name: $ionicUser.details.name
        });
        $scope.data.text = '';
        $scope.data.title = '';
        $scope.data.url = '';
      };

}])
   
.controller('surveyCtrl', ['$scope', '$stateParams', 'SurveyService', '$ionicPopup', '$ionicUser', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName

// Tutorial: http://docs.usecreator.com/docs/using-apis-with-http-part-1

function ($scope, $stateParams, SurveyService, $ionicPopup, $ionicUser) {

    $scope.data = {
        name: $ionicUser.details.name,
        favoritepresenter: 'None',
        favoriteevent: 'None',
        hotelrating: '5',
        meetingroomsrating: '5',
        mealsrating: '5',
        conferenceoverallrating: '5'
    };
    
    $scope.submitting = false;
    
    $scope.submit = function(){
        $scope.submitting = true;
        SurveyService.add($scope.data).then(function(){
            $scope.data = {
                name: $ionicUser.details.name,
                favoritepresenter: 'None',
                favoriteevent: 'None',
                hotelrating: '5',
                meetingroomsrating: '5',
                mealsrating: '5',
                conferenceoverallrating: '5'
            };
            $scope.submitting = false;
            
            $ionicPopup.alert({
                title: 'Thank you!',
                template: 'Your response has been recorded.'
            });
        
        });
        
    };

}])
   
.controller('resultsCtrl', ['$scope', '$stateParams', 'SurveyService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, SurveyService) {
    
    $scope.params = $stateParams;
    
    $scope.surveys = [];
    
    $scope.loadData = function(){
        
        if ($scope.params.name || $scope.params.favoritepresenter || $scope.params.favoriteevent){
            SurveyService.query($scope.params).then(function(res){
                $scope.surveys = res;
                $scope.$broadcast('scroll.refreshComplete');
            })
        }else{
            SurveyService.all().then(function(res){
                $scope.surveys = res;
                $scope.$broadcast('scroll.refreshComplete');
            })
        }
        
    }

    $scope.loadData();
    
    //$scope.showDelete = false;
    //$scope.toggleDelete = function(){
    //    $scope.showDelete = !$scope.showDelete;
    //}
    
    //$scope.deleteItem = function($index){
    //    SurveyService.delete($scope.surveys[$index].id).then(function(){
    //        $scope.surveys.splice($index, 1);
    //    })
    //}
    
}])
   
.controller('searchCtrl', ['$scope', '$stateParams', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state) {
    
    $scope.fields = {
        name: '',
        favoritepresenter: 'Any Presenter',
        favoriteevent: 'Any Event'
    };
    
    $scope.search = function(){
        var params = {
            name: $scope.fields.name
        };
        
        if ($scope.fields.favoritepresenter != 'Any Presenter'){
            params.favoritepresenter = $scope.fields.favoritepresenter;
        }
        
        if ($scope.fields.favoriteevent != 'Any Event'){
            params.favoriteevent = $scope.fields.favoriteevent;
        }
        
        $state.go('tabsController.results', params);
        
    };

}])
   
.controller('savedCtrl', ['$scope', '$stateParams', 'SavedScheduleService', '$state', function ($scope, $stateParams, SavedScheduleService, $state) {
    
    
    
    $scope.events = SavedScheduleService.events;
    
    console.log("From Events.js" + $scope.events.length);
    
    $scope.data = {
        search: ''
    };
    
    $scope.showSearch = false;
    $scope.changeSearch = function(){
        $scope.showSearch = !$scope.showSearch;
        $scope.data = {
            search: ''
        };
        $scope.search();
    };

    $scope.search = function(){
        var s = $scope.data.search.toLowerCase();
        
        if (s === ''){
          $scope.events = SavedScheduleService.events;
          return;
      }
      
      $scope.events = $scope.events.filter(function(event){
        if (event.eventTitle.toLowerCase().indexOf(s) > -1 || event.mealType.toLowerCase().indexOf(s) > -1 || event.eventType.toLowerCase().indexOf(s) > -1 || event.room.toLowerCase().indexOf(s) > -1)
        {
            return true;
        } 
        return false;
      });
    };
    
    //$scope.goToEvent = function(event){
      //  $state.go('event', event);
    //};
}])
   
.controller('lostAndFoundCtrl', ['$scope', '$stateParams', '$firebaseArray', '$ionicUser', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $firebaseArray, $ionicUser) {
    
    $scope.data = {
        'title': '',
        'description': ''
    };
    
      var ref = firebase.database().ref().child("other");
      // create a synchronized array
      $scope.messages = $firebaseArray(ref);
      
      // add new items to the array
      // the message is automatically added to our Firebase database!
      $scope.addMessage = function() {
        $scope.messages.$add({
          title: $scope.data.title,
          description: $scope.data.description,
          dataTime: Date.now(),
          id: $scope.messages.length + 1,
          email: $ionicUser.details.email,
          name: $ionicUser.details.name
        });
        $scope.data.title = '';
        $scope.data.description = '';
      };

}])
   
.controller('loginCtrl', ['$scope', '$stateParams', '$ionicUser', '$ionicAuth', '$state', '$ionicHistory', '$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicUser, $ionicAuth, $state, $ionicHistory, $rootScope) {

    $scope.data = {
        'email': '',
        'password': ''
    }
    
    $scope.error = '';
    
    if ($ionicAuth.isAuthenticated()) {
      // Updated on 1/9/2017 to fix issues with logging
      // out and back in, as well as history issues with side menu + tabs.
      $ionicUser.load().then(function() {
        $rootScope.$broadcast('login_change');
        $ionicHistory.nextViewOptions({
          historyRoot: true
        });
        $state.go('home');  
      });
    }
    
    $scope.login = function(){
        $scope.error = '';
        $ionicAuth.login('basic', $scope.data).then(function(){
          	$rootScope.$broadcast('login_change');
            $state.go('home');
        }, function(){
            $scope.error = 'Error logging in.';
        })
    }

}])
   
.controller('signupCtrl', ['$scope', '$stateParams', '$ionicAuth', '$ionicUser', '$state', '$ionicHistory', '$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicAuth, $ionicUser, $state, $ionicHistory, $rootScope) {
    
    $scope.data = {
        'name': '',
        'email': '',
        'password': ''
    }
    
    $scope.error='';

    $scope.signup = function(){
        
        $scope.error = '';

        $ionicAuth.signup($scope.data).then(function() {
            // `$ionicUser` is now registered
            $ionicAuth.login('basic', $scope.data).then(function(){
              
              // Updated on 1/9/2017 to fix issues with logging
    					// out and back in, as well as history issues with
              // side menu + tabs.
              $rootScope.$broadcast('login_change');
              $ionicHistory.nextViewOptions({
                historyRoot: true
              });
              $state.go('home');
            });
        }, function(err) {
            
            var error_lookup = {
                'required_email': 'Missing email field',
                'required_password': 'Missing password field',
                'conflict_email': 'A user has already signed up with that email',
                'conflict_username': 'A user has already signed up with that username',
                'invalid_email': 'The email did not pass validation'
            }    
        
            $scope.error = error_lookup[err.details[0]];
        });
    }

}])
   
.controller('mapAndHotelInformationCtrl', ['$scope', '$stateParams', '$window', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $window) {

    $scope.bookOnline = function(){
        // $window.location.href = 'http://hiltongardeninn.hilton.com/en/gi/groups/personalized/A/AUSGIGI-ISCAP-20171104/index.jhtml?WT.mc_id=POG';
        window.open('http://hiltongardeninn.hilton.com/en/gi/groups/personalized/A/AUSGIGI-ISCAP-20171104/index.jhtml?WT.mc_id=POG');
    };
    
    $scope.activeSection = 3;
    
    $scope.changeSection = function(section){
        $scope.activeSection = section;
    };

}])
   
.controller('eventCtrl', ['$scope', '$stateParams', 'ScheduleService', 'SavedScheduleService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, ScheduleService, SavedScheduleService) {
    
    $scope.params = $stateParams;
    //$scope.event = ScheduleService.ids[$stateParams.eventId];
    //$scope.event = ScheduleService.ids[$scope.params.eventId];
    $scope.events = ScheduleService.events;
    
    var events_ids = {};
   
    
    for (var i=0; i < $scope.events.length; i++){
        events_ids[$scope.events[i].eventId] = $scope.events[i];
    }
    
    console.log($scope.events.length + ' ' + $scope.params.eventId);
    $scope.event = events_ids[$scope.params.eventId];
    

    $scope.addEvent = function(){
        SavedScheduleService.addEvent($scope.event);
    };
}])
   
.controller('savedEventCtrl', ['$scope', '$stateParams', 'SavedScheduleService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, SavedScheduleService) {
    
    $scope.params = $stateParams;
    //$scope.event = ScheduleService.ids[$stateParams.eventId];
    //$scope.event = ScheduleService.ids[$scope.params.eventId];
    $scope.events = SavedScheduleService.events;
    
    var events_ids = {};
   console.log($scope.events.length + ' ' + $scope.params.eventId);
    
    for (var i=0; i < $scope.events.length; i++){
        events_ids[$scope.events[i].eventId] = $scope.events[i];
    }
    
    console.log($scope.events.length + ' ' + $scope.params.eventId);
    $scope.event = events_ids[$scope.params.eventId];
    
    console.log($scope.event.eventTitle);
    
    $scope.removeEvent = function(){
        SavedScheduleService.removeEvent($scope.event);
    };

}])
 