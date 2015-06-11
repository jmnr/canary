var hashtags = function (text) {
  return text.replace( new RegExp(/#\w+/g),
    function myFunction (x) {
      return "<a class='hashClick' href='#'>" + x + "</a>";
    });
};

var addClap = function (data) {
  if(data.message.indexOf("#") > -1) {
    data.message = hashtags(data.message);
  }
  return '<div id="' + data.time + '" class="clap">' +
    '<p>' + data.message + '</p>' +
    '<p>' + new Date(Number(data.time)).toString() + '</p>' +
  '</div>';
};

var addUserClap = function (data) {
  if(data.message.indexOf("#") > -1) {
    data.message = hashtags(data.message);
  }
  return '<div id="' + data.time + '" class="clap">' +
    '<p>' + data.message + '</p>' +
    '<p>' + new Date(Number(data.time)).toString() + '</p>' +
    '<button class="delButtons">x</button>' +
  '</div>';
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
  return "userId=" + userId + "; expires=Fri, 18 Dec 2015 12:00:00 UTC";
};
