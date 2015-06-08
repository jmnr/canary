(function(){
  "use strict";

  var cookie;
  var socket;

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

  window.onload = function() {
    socket = io();

    if(!document.cookie) {
      document.cookie = addCookie();
      console.log("NEW", document.cookie);
    } else {
      console.log("CURRENT", document.cookie);
    }

    cookie = document.cookie.split('userId=')[1];

    $.get('/allClaps', function(data) {
      var claps = JSON.parse(data);
      var accessDOM = '';
      var clapLoad = claps.length > 50 ? 50 : claps.length;
      for(var i = 0 ; i < clapLoad; i++) {
        accessDOM +=
          cookie === claps[i].userId ? addUserClap(claps[i]) : addClap(claps[i]);
      }
      $("#claps").prepend(accessDOM);
    });

    socket.on('new clap', function(data){ //socket listener
      data = JSON.parse(data);
      var clapAdd = data.userId === cookie ? $(addUserClap(data)) : $(addClap(data));
      clapAdd.hide().prependTo("#claps").fadeIn("slow");
    });

    socket.on('delete clap', function(clapId){ //socket listener
      $("#" + clapId).fadeOut("slow", function() {
        $("#" + clapId).remove();
      });
    });
  };

  $('#submitButton').click(function() {
    var newClapInput = $('#newClapInput').val();
    if(newClapInput.length > 0) {
      if(newClapInput.indexOf("<") > -1 || newClapInput.indexOf(">") > -1) {
        alert("Behave yourself!");
      } else {
        $.post( '/addClap', newClapInput, function(data) {
          var newClap = JSON.parse(data);
          socket.emit('new clap', data);
        });
      }
      
      $('#newClapInput').val('');

    } else {
      alert("Provide your egotistical ramblings in the text box.");
    }
  });

  $('#newClapInput').keypress(function(e){
    if(e.keyCode == 13) {
      $('#submitButton').click();
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
