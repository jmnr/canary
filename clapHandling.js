var hashtags = function (text) {
  return text.replace( new RegExp(/#\w+/g),
    function myFunction (x) {
      return "<a class='hashClick' href='#'>" + x + "</a>";
    });
};

var addClap = function (data) {
  // console.log(data.userId, userId);
  if(data.message.indexOf("#") > -1) {
    data.message = hashtags(data.message);
  }

  var out = '<div id="' + data.time + '" class="clap">' +
    '<p>' + data.message + '</p>';

  out += username !== "###" ? '<p>By ' + data.username + '</p>' : '';
  out += userId === data.userId ? '<button class="delButtons">x</button>' : '';

  return out + '<p>' + new Date(Number(data.time)).toString() + '</p>' + '</div>';
};

var sortClaps = function(claps) { //sorts claps by timestamp
  return claps.sort(function (a, b) {
    if (a.time < b.time)
      return 1;
    if (a.time > b.time)
      return -1;
    return 0;
  });
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
};
