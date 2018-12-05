var myIndex = 0;
rotation();

function rotation() {
  var i;
  var x = document.getElementsByClassName("rotatingImages");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }

  myIndex++;
  if (myIndex >= x.length) {myIndex = 1}
    x[myIndex-1].style.display = "block";
    setTimeout(rotation, 2500); // Changes every image every 2.5 seconds
  }

document.getElementById("body").onclick = function() {
  window.location.href = "./loginPages/login.html";
};

document.getElementById("body").onkeypress = function() {
  window.location.href = "./loginPages/login.html";
};