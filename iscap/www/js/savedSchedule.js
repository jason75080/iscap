/* !!! IMPORTANT: Rename "mymodule" below and add your module to Angular Modules above. */

angular.module('savedSchedules', ['firebase'])


.service('SavedScheduleService', ['$firebaseArray', function($firebaseArray){
    
    var ref = firebase.database().ref().child('save');
    
    var events = $firebaseArray(ref);
    
    
    
    var schedule = {
        'events': events,
        addEvent: function(event){
            events.$add(event);
        },
        removeEvent: function(event){
            events.$remove(event);
        }
    };
    
    return schedule;
    
    //var events_ids = {};

      //for (var i=0;i<events.length;i++){
        //events_ids[events[i].eventId] = events[i];
      //}

    //return {
      //  list: events,
        //ids: events_ids
    //}
    //var events_ids = {};
    
    //console.log(events_list.length);
   
    
    //for (var i=0; i < events_list.length; i++){
      //  events_ids[events_list[i].eventId] = events_list[i];
    //}

    //return{
      //  list: events_list,
        //ids: events_ids
    //};
    
    
}]);
