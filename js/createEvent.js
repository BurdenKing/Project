

var root = firebase.database().ref().child('events');

$('#createButton').click(function(){
  var myEventName = $('#eventName').val();
  var myLocation = $('#location').val();
  var myDateAndTime = $('#dateAndTime').val();
  var myDescription = $('#description').val();
    console.log(myEventName);
    
  root.push().set({
    Event_Name: myEventName,
    Location: myLocation,
    DateAndTime : myDateAndTime,
    Description: myDescription
  })
  alert("Event successfully created!");
});

