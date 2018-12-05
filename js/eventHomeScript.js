function goBack() {  
  var myURL = window.location.href;
  var myUserURL = myURL.split("?");
  var userNameString = myUserURL[1].split("=");
  var myUser = userNameString[1];
  window.location = "../userProfile.html?username=" + myUser;
}
function goCreate() {
  var myURL = window.location.href;
  var myUserURL = myURL.split("?");
  var userNameString = myUserURL[1].split("=");
  var myUser = userNameString[1];
  window.location = "./createEvent.html?username=" + myUser;
}
function goUpcoming() {
  var myURL = window.location.href;
  var myUserURL = myURL.split("?");
  var userNameString = myUserURL[1].split("=");
  var myUser = userNameString[1];
  window.location = "./upcomingEvent.html?username=" + myUser;
}
function goPast() {
  var myURL = window.location.href;
  var myUserURL = myURL.split("?");
  var userNameString = myUserURL[1].split("=");
  var myUser = userNameString[1];
  window.location = "./pastEvent.html?username=" + myUser;
}