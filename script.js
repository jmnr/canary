(function(){
  "use strict";

  var currentHash;
  var userId;
  var username;
  var socket;
  var markerCoords;
  var mapLoaded = false;

  $(document).ready(function () {
    $("#usernameContainer").hide();
    $("#newClap").hide();
    // $("#clapContainer").hide();
    $("#mapContainer").hide();

    if(needsUsername()) {
      $("#usernameContainer").fadeIn("slow");
    } else {
      $("#newClap").fadeIn("slow");
    }
  });

  window.onload = function () {

    socket = io();

    cookieCheck(); //if they have no username, add null and if they have no userId, add one

    serverGrab();

    socket.on('new clap', function(data){ //socket listener
      data = JSON.parse(data);
      var clapAdd = $(addClap(data));
      clapAdd.hide().prependTo("#claps").fadeIn("slow");
      hub.emit("new clap", data);
    });

    socket.on('delete clap', function(clapId){ //socket listener
      $("#" + clapId).fadeOut("slow", function() {
        $("#" + clapId).remove();
      });
    });
  };


  $('#submitButton').click(function() {
    if($('#newClapInput').val().length > 0) {
        var clapData = {
          userId: document.cookie.split("userId=").pop().split(";").shift(),
          username: document.cookie.split("username=").pop().split(";").shift(),
          message: $('#newClapInput').val(),
          lat: geolatitude,
          lon: geolongitude
        };

        $.post( '/addClap', JSON.stringify(clapData), function(data) {
          var newClap = JSON.parse(data);
          socket.emit('new clap', data);
          hub.emit("new clap", newClap);
        });

        $('#newClapInput').val('');

      } else {
        alert("Provide your egotistical ramblings in the text box.");
      }
  });


  //// map load listener
  hub.listen("main map loaded", function() {
    $.get('/allClaps', function(data) {
      var claps = JSON.parse(data);
      var clapLoad = claps.length > 50 ? 50 : claps.length;
      for(var i = 0 ; i < clapLoad; i++) {
        hub.emit("new clap", claps[i]);
      }
      mapLoaded = true;
      $("#mapContainer").fadeIn("slow");
    });
  });

  $('#submitUsername').click(function() {
    var usernameText = $('#usernameInput').val();

    if(usernameText.length < 1) {
      alert("Please enter a username");
      return;

    } else if (!usernameText.match(/^[a-z0-9]+$/i)) {
      alert("Alphanum only please");
      $('#usernameInput').val('');
      return;

    } else {
      document.cookie = "username=" + usernameText + ";";
      $("#usernameContainer").fadeOut("slow", function() {
        $('#usernameInput').val('');
        $("#newClap").fadeIn("slow");
      });
    }
  });

  $('#denyUsername').click(function() {
    document.cookie = "username=###";
    $("#usernameContainer").fadeOut("slow", function() {
        $("#newClap").fadeIn("slow");
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

  $('#clearUsernameButton').click(function() {
    document.cookie = "username=###";
    username = "###";
    $("#newClap").fadeOut("slow", function() {
      $("#usernameContainer").fadeIn("slow");
    });
  });

  $('#toFeed').click(function() {
    $("#mapContainer").fadeOut("slow", function() {
      $("#clapContainer").fadeIn("slow");
    });
  });

  $('#toMap').click(function() {
    $("#clapContainer").fadeOut("slow", function() {
      hub.emit("page loaded", null);
      $("#mapContainer").fadeIn("slow");
    });
  });

  $('body').on('click','.hashClick', function() {
    var tag = $(this).text();

    if(currentHash === tag) {
      $("#claps").fadeOut("slow", function() {
        currentHash = false;
        serverGrab();
      });
    } else {
      $.get('/allClaps', function(data) {
        currentHash = tag;
        var claps = JSON.parse(data).filter(function(x) {return x.message.indexOf(tag) >-1;});
        claps = claps.sort(sortClaps);
        var accessDOM = '';
        var clapLoad = claps.length > 50 ? 50 : claps.length;
        for(var i = 0 ; i < clapLoad; i++) {
          // markerCoords.push(claps[i]);
          // hub.emit("new clap", claps[i], mapName);  //
          accessDOM += addClap(claps[i]);
        }
        $("#claps").fadeOut("slow", function() {
          $("#claps").html(accessDOM);
          $("#claps").fadeIn("slow");
        });
        // console.log(markerCoords);
        // geolocation.addAllMarkers(markerCoords);
      });
    }
  });

  $('body').on('click','.delButtons', function() {
    // var deleteObj = {
    //   clapId: $(this).parent().attr("id"),
    //   userId: userId
    // };
    var clapId = $(this).parent().attr("id");
    $.post('/delete', clapId, function() {
      socket.emit('delete clap', clapId);
    });
  });

}());
