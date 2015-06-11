(function(){
  "use strict";

  var userId;
  var username;
  var socket;

  var hashtags = function (text) {
    return text.replace( new RegExp(/#\w+/g),
      function myFunction (x) {
        return "<a class='hashClick' href='#'>" + x + "</a>";
      });
  };

  var addClap = function (data) {
    console.log(data.userId, userId);
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

  var scriptProtect = function(text) {
    return text.replace(">", "&gt").replace("<", "&lt");
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

  $(document).ready(function () {
    $("#usernameContainer").hide();
  });

  window.onload = function() {

    socket = io();

    cookieCheck(); //if they have no username, add null and if they have no userId, add one

    if(needsUsername()) {
      $("#usernameContainer").fadeIn("slow");
    }

    $.get('/allClaps', function(data) {
      var claps = JSON.parse(data);
      var accessDOM = '';
      var clapLoad = claps.length > 50 ? 50 : claps.length;
      for(var i = 0 ; i < clapLoad; i++) {
        // geolocation.checkCoords(claps[i]);
        accessDOM += addClap(claps[i]);
      }
      $("#claps").prepend(accessDOM);
    });

    socket.on('new clap', function(data){ //socket listener
      data = JSON.parse(data);
      var clapAdd = $(addClap(data));
      clapAdd.hide().prependTo("#claps").fadeIn("slow");
    });

    socket.on('delete clap', function(clapId){ //socket listener
      $("#" + clapId).fadeOut("slow", function() {
        $("#" + clapId).remove();
      });
    });
  };

  $('#submitButton').click(function() {
    var clapData = {};
    clapData.userId = userId = document.cookie.split("userId=").pop().split(";").shift();
    clapData.username = username = document.cookie.split("username=").pop().split(";").shift();
    clapData.message = $('#newClapInput').val();
    clapData.lat = geolocation.lat;
    clapData.lon = geolocation.lon;

    if(clapData.message.length > 0) {

      if(clapData.message.indexOf("<") > -1 || clapData.message.indexOf(">") > -1) {
        clapData.message = scriptProtect(clapData.message);
      }

      $.post( '/addClap', JSON.stringify(clapData), function(data) {
        var newClap = JSON.parse(data);
        socket.emit('new clap', data);
        // geolocation.checkCoords(newClap); //change name of checkcoords to be more descriptive
      });

      $('#newClapInput').val('');
    } else {
      alert("Provide your egotistical ramblings in the text box.");
    }
  });

  $('#submitUsername').click(function() {
    var usernameText = $('#usernameInput').val();

    if(usernameText.length < 1) {
      alert("Please enter a username");
      return;
    }

    if(!usernameText.match(/^[a-z0-9]+$/i)) {
      alert("Alphanum only please");
      $('#usernameInput').val('');
      return;
    }

    document.cookie = "username=" + usernameText + ";";
    $("#usernameContainer").fadeOut("slow", function() {
        $("#usernameContainer").remove();
    });
  });

  $('#denyUsername').click(function() {
    document.cookie = "username=###";
    $("#usernameContainer").fadeOut("slow", function() {
        $("#usernameContainer").remove();
    });
  });

  $('#newClapInput').keypress(function(e){
    if(e.keyCode == 13) {
      $('#submitButton').click();
      return false; //prevents a linebreak being added by enter key
    }
  });

  $('#usernameInput').keypress(function(e){
    if(e.keyCode == 13) {
      $('#submitUsername').click();
      return false; //prevents a linebreak being added by enter key
    }
  });

  $('body').on('click','.hashClick', function() {
    console.log($(this).text());
  });

  $('body').on('click','.delButtons', function() {
    var clapId = $(this).parent().attr("id");
    $.post('/delete', clapId, function() {
      socket.emit('delete clap', clapId);
    });
  });
}());
