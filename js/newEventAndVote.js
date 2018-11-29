var root = firebase.database().ref().child('events');

$('#myBtn').click(function(){
  var myEventName = $('#eventName').val();
  var myLocation = $('#location').val();
  var myTime = $('#time').val();
  var myDate = $('#date').val();
  var myDescription = $('#desciption').val();
    
  root.push().set({
    Event_Name: myEventName ,
    Location: myLocation,
    Time: myTime,
    Date: myDate,
    Description: myDescription
  })
  alert("Event successfully created!");
});

