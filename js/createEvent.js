

var root = firebase.database().ref().child('events');

$('#button3').click(function(){
  var myEventName = $('#eventName').val();
  var myLocation = $('#location').val();
  var myTime = $('#time').val();
  var myDate = $('#date').val();
  var myDescription = $('#description').val();
    console.log(myEventName);
    
  root.push().set({
    Event_Name: myEventName,
    Location: myLocation,
    Time: myTime,
    Date: myDate,
    Description: myDescription
  })
  alert("Event successfully created!");
});

