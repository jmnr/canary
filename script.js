(function(){
  "use strict";

  var cookie, socket;

  var loadAllClaps = function() {
      socket = io();

      if(!document.cookie) {
        document.cookie = addCookie();
      }

      cookie = document.cookie.split('userId=')[1];

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

  window.onload = geolocation.initialize(loadAllClaps);

  $('#submitButton').click(function() {
    var clapData = {};
    clapData.message = $('#newClapInput').val();
    clapData.lat = geolocation.lat;
    clapData.lon = geolocation.lon;
    // console.log( clapData.lat );

    if(clapData.message.length > 0) {

      // if(clapData.message.indexOf("<") > -1) {
      //   clapData.message = clapData.message.replace("<", "&lt");
      // }
      // if(clapData.message.indexOf(">") > -1) {
      //   clapData.message = clapData.message.replace(">", "&gt");
      // }

      if(clapData.message.indexOf("<") > -1 || clapData.message.indexOf(">") > -1) {
        return;
      }

      $.post( '/addClap', JSON.stringify(clapData), function(data) {
        var newClap = JSON.parse(data);
        console.log("clap received from post request:", newClap);
        geolocation.checkCoords(newClap); //change name of checkcoords to be more descriptive
        socket.emit('new clap', data);

      });

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
