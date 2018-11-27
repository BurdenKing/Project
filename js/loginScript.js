var modal = document.getElementById('myModal');
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
  modal.style.display = "block";
}
span.onclick = function() {
  modal.style.display = "none"; 
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Get the modal for forgot password
var modal1 = document.getElementById('myModal1');
var span1 = document.getElementById("forgot");
var span2 = document.getElementsByClassName("close1")[0]; 
span1.onclick = function() {
  modal1.style.display = "block";
}
span2.onclick = function() {
  modal1.style.display = "none"; 
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal1.style.display = "none";
  }
}
      var root = firebase.database().ref().child('usernames');
$('#createButton').click(function(){
  var myUser = $('#inputUser').val();
  var myFirst = $('#inputFirst').val();
  var myLast = $('#inputLast').val();
  var myInt = $('#interest').val();
  var myPwd = $('#inputPass').val();
  root.push().set({
    username: myUser,
    fName: myFirst,
    lName: myLast,
    interest: myInt,
    password: myPwd
  })
  alert("Account successfully created!");
});
$('#loginButton').click(function(){
  var userFound = false;
  var inputUser = $('#userName1').val();
  var inputPass = $('#pwd1').val();
  
  root.on('value', function(snap){
    snap.forEach(function(childNodes){
      //childNodes.val().fName has the collection of first names
      var tempUser = childNodes.val().username;
      var tempPass = childNodes.val().password;
      if (inputUser === tempUser && inputPass === tempPass){
          userFound = true;
      }
    })
    if (userFound){
      window.location = "../userHome/userProfile.html?username=" + inputUser;
    }
    else {
      alert("Username/Password not found!");    
    }
  })
});