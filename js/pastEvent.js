//firebase reference.
var database = firebase.database();

//Grab the userName from url.    
var myURL = window.location.href;
var myUserURL = myURL.split("?");
var userNameString = myUserURL[1].split("=");
var myUser = userNameString[1];


// root ref to firebase.
var ref = database.ref().child('events'); 


//now is the present time coverts into mili secs.    
var now = new Date().valueOf();


ref.on('value',getData);
    function getData(data){
        var events = data.val();
        var eventsArray = Object.keys(events);

for(var i = 0; i < eventsArray.length; i++){

    var AllMembersArray = [];

    //Array for all keys under child 'events'.
    var k = eventsArray[i];

    //loop through all keys in events and store different fields.
    var myEventName = events[k].Event_Name;
    var myDateAndTime = events[k].DateAndTime;
    var myLocation = events[k].Location;
    var myGroup = events[k].Group;
    var myDescription = events[k].Description;
    var myAttendees = events[k].AllMembers;

    //An array of all attendees for one event.
    AllMembersArray.push(myAttendees);

    for (var j = 0; j < AllMembersArray.length; j++){
        console.log(AllMembersArray[j]);
        if((AllMembersArray[j].join().includes(myUser)) && (Date.parse(myDateAndTime) < now )){

    //construct body part. 
    var li = document.createElement('div');
            li.innerHTML = myEventName + "<br/>"
                         + "Date and Time : " + myDateAndTime + "<br/>"
                         + "Location : " + myLocation + "<br/>"
                         + "Description : " + myDescription + "<br/>"
                         + "Group(s) : " + myGroup + "<br/>"
                         + "Attendees :" + myAttendees + "<br/>"

    li.setAttribute("id","bodyNodes");
    document.body.appendChild(li);       
        }
    }
  }
}