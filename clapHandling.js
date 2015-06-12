var hashtags = function (text) {
  return text.replace( new RegExp(/#\w+/g),
    function myFunction (x) {
      return "<a class='hashClick' href='#!'>" + x + "</a>";
    });
};

var serverGrab = function() {
  $.get('/allClaps', function(data) {
    var claps = JSON.parse(data).sort(sortClaps);
    var accessDOM = '';
    var clapLoad = claps.length > 50 ? 50 : claps.length;
    for(var i = 0 ; i < clapLoad; i++) {
      // markerCoords.push(claps[i]);
      // geolocation.addMarker(claps[i], geolocation.map);
      accessDOM += addClap(claps[i]);
    }
    $("#claps").html(accessDOM);
    $("#claps").fadeIn("slow");
    // console.log(markerCoords);
    // geolocation.addAllMarkers(markerCoords);
  });
};

var timeParser = function (time) {
  return time.toLocaleDateString() + " " + time.getHours() + ":" + time.getMinutes();
};

var addClap = function (data) {
  if(data.message.indexOf("#") > -1) {
    data.message = hashtags(data.message);
  }

  var out = '<div id="' + data.time + '" class="clap">' +
    '<p>' + data.message + '</p>';

  out += username !== "###" ? '<p>by ' + data.username + '</p>' : '';
  out += userId === data.userId ? '<button class="delButtons">x</button>' : '';

  return out + '<p>posted on ' + timeParser(new Date(Number(data.time))) + '</p>' + '</div>';
};

var sortClaps = function (a, b) {
  var aTime = Number(a.time);
  var bTime = Number(b.time);
  if (aTime < bTime) {
    return 1;
  }
  if (aTime > bTime) {
    return -1;
  }
  return 0;
};

var addCookie = function() {
  var userId = "";
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for(var i = 0; i < 10; i++) {
      userId += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return "userId=" + userId + ";"; //expires=Fri, 18 Dec 2015 12:00:00 UTC";
};

var needsUsername = function () {
  var check = document.cookie;
  return (check.indexOf("username=") < 0 || //check if a username cookie doesn't exist
    check.split("username=").pop().split(";").shift() === "###"); //or is our null placeholder
};

var cookieCheck = function() {
  var check = document.cookie;
  if(check.indexOf("username=") < 0) {
    document.cookie = "username=###";
  }
  if(check.indexOf("userId=") < 0) {
    document.cookie = addCookie();
  }

  userId = document.cookie.split("userId=").pop().split(";").shift();
  username = document.cookie.split("username=").pop().split(";").shift();
  console.log("userId=" + userId, "username=" + username);
};
