(function(){
  "use strict";

  var cookie;

  var hashtags = function (text) {
    return text.replace( new RegExp(/#\w+/g),
      function myFunction(x){return "<a class='hashClick' href='#'>" + x + "</a>" ;});
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

  var getAllClaps = function() {
    $.get('/cookie', function(data) {
      cookie = data;
    });
    hub.listen("map loaded", function(){
      $.get('/allClaps', function(data) {
        var claps = JSON.parse(data);
        var accessDOM = '';
        var clapLoad = claps.length > 50 ? 50 : claps.length;
        for(var i = 0 ; i < clapLoad; i++) {
          geolocation.checkCoords(claps[i]);
          accessDOM +=
            cookie === claps[i].userId ? addUserClap(claps[i]) : addClap(claps[i]);
        }
        $("#claps").prepend(accessDOM);
      });
    });
  };

  window.onload = hub.emit("page loaded");


  $('#submitButton').click(function() {
    var newClapInput = $('#newClapInput').val();
    var postMesssage = {};
    postMesssage.message = newClapInput;
    postMesssage.lat = geolocation.lat;
    postMesssage.lon = geolocation.lon;
    console.log("newclap:", postMesssage);
    if(newClapInput.length > 0) {
      if(newClapInput.indexOf("<") > -1 || newClapInput.indexOf(">") > -1) {
        alert("Behave yourself!");
      } else {
        $.post( '/addClap', JSON.stringify(postMesssage), function(data) {
          console.log("post request sent");
          var newClap = JSON.parse(data);
          console.log("clap received from post request:", newClap);
          var userIdMatch =
            cookie === newClap.userId ? $(addUserClap(newClap)) : $(addClap(newClap));
          userIdMatch.hide().prependTo("#claps").fadeIn("slow");
          geolocation.checkCoords(newClap);
        });
      }

    } else {
      alert("Provide your egotistical ramblings in the text box.");
    }
  });

  $('#newClapInput').keypress(function(e){
    if(e.keyCode == 13) {
      $('#submitButton').click();
      return false; //prevents a linebreak being added with enter key
    }
  });

  $('body').on('click','.hashClick', function() {
    console.log($(this).text());
  });

  $('body').on('click','.delButtons', function() {
    var clapId = $(this).parent().attr("id");
    $(this).parent().fadeOut("slow", this.remove()); //remove is a callback so fade goes first
    $.post('/delete', clapId, function() {
      console.log("delete request sent");
    });
  });

}());
