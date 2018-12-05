var database = firebase.database();
var ref = database.ref().child('events');



//isValidUser validates if user have the access to events.
var myURL = window.location.href;
var myUserURL = myURL.split("?");
var userNameString = myUserURL[1].split("=");
var myUser = userNameString[1];
var ref = database.ref().child('events');
var now = new Date().valueOf();
ref.on('value', function (snapshot) {
  snapshot.forEach(function (childSnapshot) {
    var myEventsName = childSnapshot.val().Event_Name;
    var myDateAndTime = childSnapshot.val().DateAndTime;
    if (Date.parse(myDateAndTime) >= now && isValidUser) {
      eventsArray.push(myEventsName);
    }
  });
  for (var i = 0; i < eventsArray.length; i++) {
    var temp = document.createElement('event');
    temp.innerHTML = eventsArray[i];
    document.body.appendChild(temp);
    var Btn = document.createElement('input');
    Btn.setAttribute("type", "button");
    Btn.setAttribute("value", "vote");
    Btn.setAttribute("id", "voteBtn");
    Btn.setAttribute("onClick", myOnClick);

    function myOnClick {

    }
    document.body.appendChild(Btn);
  }


  var lineBreak = document.createElement('br');
  document.body.appendChild(lineBreak);
  var myBtn = document.createElement('input');
  myBtn.setAttribute("type", "button");
  myBtn.setAttribute("value", "submit");
  document.body.appendChild(myBtn);

  myBtn.onclick = function () {
    ref.on('value', getData);

    function get
    var lineBreak = document.createElement('br');
    document.body.appendChild(lineBreak);
    ref.on('value', function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var myEventsName = childSnapshot.val().Event_Name;
        var myDateAndTime = childSnapshot.val().DateAndTime;
        var myVoteCount = childSnapshot.val().VoteCount;
        if (Date.parse(myDateAndTime) >= now && isValidUser) {
          eventsArray.push(myEventsName);
          voteCountArray.push(myVoteCount);
        }

      })
    })
    for (var i = 0; i < eventsArray.length; i++) {

      var temp = document.createElement('result');
      temp.innerHTML = eventsArray[i] + " Votes : " + voteCountArray[i];
      document.body.appendChild(temp);
      var lineBreak = document.createElement('br');
      document.body.appendChild(lineBreak);
    }


  }
});