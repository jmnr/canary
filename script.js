(function(){
  "use strict";

  var cookie;

  var addClap = function (data) {
    return '<div class="clap">' +
      '<p>' + data.message + '</p>' +
      '<p>' + new Date(data.time).toString() + '</p>' +
    '</div>';
  };

  var addUserClap = function (data) {
    return '<div class="clap">' +
      '<p>' + data.message + '</p>' +
      '<p>' + new Date(data.time).toString() + '</p>' +
      '<button class="delButtons">Delete</button>' +
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

  window.onload = function() {
    $.get('/cookie', function(data) {
      cookie = data;
    });
    $.get('/allClaps', function(data) {
      var claps = sortClaps(JSON.parse(data));
      var accessDOM = '';
      // for(var i = 0; i < claps.length; i++) {
      //   accessDOM += addClap(claps[i]);
      // }
      for(var i = claps.length - 1 ; i >= 0; i--) {
        accessDOM += cookie === claps[i].userId
          ? addUserClap(claps[i]) : addClap(claps[i]);
      }

      $("#claps").prepend(accessDOM);
    });
  };

  $('#submitButton').click(function() {
    if($('#newClapInput').val().length !== 0) {
      $.post( '/addClap', $('#newClapInput').val(), function(data) {
        if(data === "malicious") {
          alert("Behave yourself!");
        } else {
          var newClap = JSON.parse(data);
          var clapVerification = cookie === newClap.userId
            ? $(addUserClap(newClap)) : $(addClap(newClap));
          clapVerification.hide().prependTo("#claps").fadeIn("slow");
        }
      });
      
      $('#newClapInput').val('');
    } else {
      alert("Provide your egotistical ramblings in the text box.");
    }
  });

  $('#newClapInput').keypress(function(e){
    if(e.keyCode == 13) {
      $('#submitButton').click();
      return false; //prevents a linebreak being added 
    }
  });

  $('body').on('click','.delButtons', function() {
    $(this).parent().fadeOut("slow", this.remove()); //remove is a callback so fade goes first
  });

}());
