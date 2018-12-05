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
      document.getElementById("inputFirst").placeholder = myFirst;
      document.getElementById("inputLast").placeholder = myLast;
      document.getElementById("interest").placeholder = int;
    }
  })
})
function goBack(){
  var myURL = window.location.href;
  var myUserURL = myURL.split("?");
  var userNameString = myUserURL[1].split("=");
  var myUser = userNameString[1];
  window.location = "../userProfile.html?username=" + myUser;
}
function readData() {
  var myURL = window.location.href;
  var myUserURL = myURL.split("?");
  var userNameString = myUserURL[1].split("=");
  var myUser = userNameString[1];
  
  root.on('value', function(snap){
    snap.forEach(function(childNodes){
      var tempUser = childNodes.val().username;
      if (tempUser === myUser){
        var newFirst = document.getElementById("inputFirst").value;
        var newLast = document.getElementById("inputLast").value;
        var newInt = document.getElementById("interest").value;
        var newPwd = document.getElementById("inputPass").value;
        if (newFirst !== ""){
          childNodes.ref.update({fName: newFirst});
        }
        if (newLast !== ""){
          childNodes.ref.update({lName: newLast});
        }
        if (newInt !== ""){
          childNodes.ref.update({interest: newInt});
        }
        if (newPwd !== ""){
          childNodes.ref.update({password: newPwd});
        }
      }
    })
  })
  window.location = "../userProfile.html?username=" + myUser;      
}  
