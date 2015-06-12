(function(){
  "use strict";

  var currentHash;
  var userId;
  var username;
  var socket;
  var markerCoords;

  $(document).ready(function () {
    $("#usernameContainer").hide();
  });

  var loadAllClaps = function() {

    socket = io();
    markerCoords = [];

    cookieCheck(); //if they have no username, add null and if they have no userId, add one

    if(needsUsername()) {
      $("#newClap").hide();
      $("#usernameContainer").fadeIn("slow");
    }

    serverGrab();

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

  window.onload = loadAllClaps();//geolocation.initialize(loadAllClaps);

  $('#submitButton').click(function() {
    var clapData = {};
    clapData.userId = document.cookie.split("userId=").pop().split(";").shift();
    clapData.username = document.cookie.split("username=").pop().split(";").shift();
    clapData.message = $('#newClapInput').val();
    clapData.lat = geolocation.lat;
    clapData.lon = geolocation.lon;

    if(clapData.message.length > 0) {

      $.post( '/addClap', JSON.stringify(clapData), function(data) {
        var newClap = JSON.parse(data);
        socket.emit('new clap', data);
        geolocation.checkCoords(newClap); //change name of checkcoords to be more descriptive
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

    } else if (!usernameText.match(/^[a-z0-9]+$/i)) {
      alert("Alphanum only please");
      $('#usernameInput').val('');
      return;

    } else { 
      document.cookie = "username=" + usernameText + ";";
      $("#usernameContainer").fadeOut("slow", function() {
        $("#usernameContainer").remove();
      });
      switchToClapInput();
    }
  });

  $('#denyUsername').click(function() {
    document.cookie = "username=###";
    $("#usernameContainer").fadeOut("slow", function() {
        $("#usernameContainer").remove();
    });
    switchToClapInput();
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
    var tag = $(this).text();
    if(currentHash === tag) {
      $("#claps").fadeOut("slow", function() {
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
          markerCoords.push(claps[i]);
          // geolocation.addMarker(claps[i], geolocation.map);
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
    var clapId = $(this).parent().attr("id");
    $.post('/delete', clapId, function() {
      socket.emit('delete clap', clapId);
    });
  });
}());
