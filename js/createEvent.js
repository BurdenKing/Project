

var root = firebase.database().ref().child('events');

var groupRef = firebase.database().ref().child('groups');

var groupNameArray =[];


   



$('#createButton').click(function(){
    
  
  
groupRef.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val().groupName;
      groupNameArray.push(childData);
    });

});

    function isValidGroups(myArray){
        var tempCount = 0;
        for(var i = 0; i < myArray.length; i++){
            if(groupNameArray.includes(myArray[i])){
                tempCount ++;
            }
        }
        if (tempCount == myArray.length){
        return true;
        } else {
            return false;
        }
    }
    
  

  var myEventName = $('#eventName').val();
  var myLocation = $('#location').val();
  var myDateAndTime = $('#dateAndTime').val();
  var myDescription = $('#description').val();
  var myGroup = $('#group').val();
  var isValidGroup = false;
  var temp = myGroup.split(",");


    
 for(var i = 0; i < temp.length; i++){
     var j = temp[i];
     if (isValidGroups(temp)){
           root.push().set({
                Event_Name: myEventName,
                Location: myLocation,
                DateAndTime : myDateAndTime,
                Description: myDescription,
                Group: myGroup,
                VoteCount : 0
  })
  alert("Event successfully created!");
     } else {
         alert("Cannot find group(s)! Please check and invite group(s) again!");
     }
 }
});
         
         



