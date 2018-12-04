var myURL = window.location.href;
var myUserURL = myURL.split("?");
var userNameString = myUserURL[1].split("=");
var myUser = userNameString[1];
var myPop = document.getElementById('popup1');
var list = document.createElement('li');
list.appendChild(document.createTextNode(myUser + ", Creator of Group"));
list.setAttribute("class", "groupList");
myPop.append(list);

//enter groups the person is in here
//add the data to id = "#groups" 
var groupNameList = document.getElementById("groups");
var dispGroup = firebase.database().ref().child('groups');   
var count = 0;
dispGroup.on('value', function(snap){
  snap.forEach(function(childNodes){
    var memberList = childNodes.val().groupMembers;
    var groupCreate = childNodes.val().groupCreate;
    var groupName = childNodes.val().groupName;
    var tempDel1 = memberList.split(", ");
    var inGroup = false;
    for(var j = 0; j < tempDel1.length - 1; j++){
      if(myUser === tempDel1[j]){
        inGroup = true;
        break;
      }
    }
    if(inGroup){
      count = count + 1;
      var myDiv = document.createElement("div");
      myDiv.setAttribute("class", "groups1");
      myDiv.setAttribute("id", "group" + count);
      myDiv.setAttribute("onclick", "processGroup('" + groupName + "')");
      var nodeGroupName = document.createTextNode("Group #" + count + ": " + groupName);
      var nodeCreator = document.createTextNode("Group Host: " + groupCreate);
      var nodeMembers = document.createTextNode("Group Members: " + memberList);
      myDiv.appendChild(nodeGroupName);
      myDiv.appendChild(document.createElement("br"));
      myDiv.appendChild(nodeCreator);
      myDiv.appendChild(document.createElement("br"));
      myDiv.appendChild(nodeMembers);
      groupNameList.append(myDiv);
    }
  })
})
var root = firebase.database().ref().child('usernames');
var modal = document.getElementById('myModal');
var createBtn = document.getElementById('create');
createBtn.onclick = function(){
  modal.style.display = "block";
}
var closeSp = document.getElementsByClassName('close')[0];
closeSp.onclick = function(){
  modal.style.display = "none";  
}
var closeSp1 = document.getElementsByClassName('close')[1];
closeSp1.onclick = function(){
  var editmodal = document.getElementById('editModal');
  editmodal.style.display = "none";
  var myURL = window.location.href;
  var myUserURL = myURL.split("?");
  var userNameString = myUserURL[1].split("=");
  var myUser = userNameString[1];
  window.location = "../groups/groupHome.html?username=" + myUser;
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
document.getElementById("add").onclick = function(){
  var inputUser = document.getElementById("invUser").value;
  var userFoundDB = "false";
  var userFoundList = false;
  var namesList = document.getElementsByClassName("groupList");
  for (var i = 0; i < namesList.length; i++){
    var checkNameFull = namesList[i].innerHTML;
    var checkNameDel = checkNameFull.split(",");
    var checkName = checkNameDel[0];
    if(inputUser === checkName){
      userFoundList = true;
    }
  }
  if(!userFoundList){
    root.on('value', function(snap){
      snap.forEach(function(childNodes){
        var tempUser = childNodes.val().username;
        var tempFirst = childNodes.val().fName;
        var tempLast = childNodes.val().lName;
        var count = 0;
        if (inputUser === tempUser){
          var myPop = document.getElementById('popup1');
          var list = document.createElement('li');
          list.innerHTML = inputUser + ", " + tempFirst + " " + tempLast;
          list.setAttribute("class", "groupList");
          myPop.setAttribute("class", "center");
          myPop.append(list);
          userFoundDB = "true";
        }
      })
      if(userFoundDB == "false"){
        alert("Username not found!");
      }
    })
  } else {
    alert("Username already in list!");
  }
  document.getElementById("invUser").value = "";
}
document.getElementById("submit").onclick = function(){
  var myURL = window.location.href;
  var myUserURL = myURL.split("?");
  var userNameString = myUserURL[1].split("=");
  var myUser = userNameString[1];
  var groupName = document.getElementById("groupName").value;
  var namesList = document.getElementsByClassName("groupList");
  var rootGroup = firebase.database().ref().child('groups');
  var groupString = "";
  for (var i = 0; i < namesList.length; i++){
    var checkNameFull = namesList[i].innerHTML;
    var checkNameDel = checkNameFull.split(",");
    var checkName = checkNameDel[0];
    if(i === namesList.length - 1){
      groupString = groupString + checkName;
    }
    else{
      groupString = groupString + checkName + ", ";
    }
  }
  if(groupName == ""){
    alert("Please enter a group name");
  }
  else{
    rootGroup.push().set({
      groupName: groupName,
      groupMembers: groupString,
      groupCreate: myUser
    })
    window.location = "../groups/groupHome.html?username=" + myUser;
  }
}
function processGroup(groupName){
  var modal = document.getElementById('editModal');
  modal.style.display = "block";
  var popupScreen = document.getElementById('popupEdit');
  var dispGroup = firebase.database().ref().child('groups');
  dispGroup.on('value', function(snap){
    snap.forEach(function(childNodes){
      
      var memberList = childNodes.val().groupMembers;
      //stores the member list from the database
      var groupCreate = childNodes.val().groupCreate;
      var groupNameDB = childNodes.val().groupName;
      var tempDel1 = memberList.split(", ");
      
      if (groupName === groupNameDB){
        
        var gNameText = document.createElement("h2"); 
        gNameText.setAttribute("class", "editText");
        gNameText.appendChild(document.createTextNode("Group Name = " + groupNameDB));
        popupScreen.append(gNameText);
        
        var gCreateText = document.createElement("h2");
        gCreateText.setAttribute("class", "editText");
        gCreateText.appendChild(document.createTextNode("Group Creator = " + groupCreate));
        popupScreen.append(gCreateText);
        
        var gGroupMember = document.createElement("h2");
        gGroupMember.setAttribute("class", "editText");
        gGroupMember.appendChild(document.createTextNode("Group Members:"));
        popupScreen.append(gGroupMember);
        if(tempDel1.length > 1){
          for (var i = 1; i < tempDel1.length; i++){
            var membersDiv = document.createElement("div");
            membersDiv.setAttribute("class", "listMember");
            membersDiv.setAttribute("onclick", "removeMem('" + groupNameDB + "', '" + tempDel1[i] + "')");
            var eachMember = document.createElement("h3");
            eachMember.setAttribute("class", "editText");
            eachMember.appendChild(document.createTextNode(tempDel1[i]));
            membersDiv.appendChild(eachMember);
            popupScreen.append(membersDiv);
          }
        }
      }
    })
  })
}
function removeMem(groupName, memberName){
  var rootGroup = firebase.database().ref().child('groups');
  dispGroup.on('value', function(snap){
    snap.forEach(function(childNodes){
      var currKey = childNodes.key;
      var memberList = childNodes.val().groupMembers;
      //stores the member list from the database
      var groupCreate = childNodes.val().groupCreate;
      var groupNameDB = childNodes.val().groupName;
      var tempDel1 = memberList.split(", ");
      if (groupNameDB === groupName){
        var tempStr = "";
        for (var i = 0; i < tempDel1.length; i++){
          if (i == 0){
            tempStr += tempDel1[i];
          } else if (memberName !== tempDel1[i]){
            tempStr += ", " + tempDel1[i];
          }
        }
        
        var tempGroup = firebase.database().ref('/groups/' + currKey)
        tempGroup.update({
          'groupCreate': groupCreate,
          'groupName': groupNameDB,
          'groupMembers': tempStr
        });            
      }
    })
  })
  alert("Successfully removed " + memberName);
  var myURL = window.location.href;
  var myUserURL = myURL.split("?");
  var userNameString = myUserURL[1].split("=");
  var myUser = userNameString[1];
  window.location = "../groups/groupHome.html?username=" + myUser;
}
function goBack(){
  var myURL = window.location.href;
  var myUserURL = myURL.split("?");
  var userNameString = myUserURL[1].split("=");
  var myUser = userNameString[1];
  window.location = "../userProfile.html?username=" + myUser;
}