var myURL = window.location.href;
var myUserURL = myURL.split("?");
var userNameString = myUserURL[1].split("=");
var myUser = userNameString[1];
//username string is saved in myUser variable
var root = firebase.database().ref().child('usernames');
root.on('value', function(snap){
  snap.forEach(function(childNodes){
    var tempUser = childNodes.val().username;
    if (tempUser === myUser){
      //alert(childNodes.val().fName);
      var myFirst = childNodes.val().fName;
      var myLast = childNodes.val().lName;
      var int = childNodes.val().interest;
      document.getElementById("fName").innerHTML = "<b>First Name:</b> " + myFirst;
      document.getElementById("lName").innerHTML = "<b>Last Name:</b> " + myLast;
      document.getElementById("interest").innerHTML = "<b>Interests:</b> " + int;
      document.getElementById("home").innerHTML = "Hello " + tempUser + ", Welcome to EventsGo."
    }
  }) 
})
function editPage(){
  var myURL = window.location.href;
  var myUserURL = myURL.split("?");
  var userNameString = myUserURL[1].split("=");
  var myUser = userNameString[1];
  window.location = "./edit/editPage.html?username=" + myUser;
}
function groupPage(){
  var myURL = window.location.href;
  var myUserURL = myURL.split("?");
  var userNameString = myUserURL[1].split("=");
  var myUser = userNameString[1];
  window.location = "./groups/groupHome.html?username=" + myUser;
}
function eventPage(){
  var myURL = window.location.href;
  var myUserURL = myURL.split("?");
  var userNameString = myUserURL[1].split("=");
  var myUser = userNameString[1];
  window.location = "./events/eventHome.html?username=" + myUser;
}

function signout(){
  window.location = "../index.html";
}