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
      var clapLoad = claps.length > 50 ? 50 : claps.length;
      for(var i = 0 ; i < clapLoad; i++) {
        accessDOM +=
          cookie === claps[i].userId ? addUserClap(claps[i]) : addClap(claps[i]);
      }

      $("#claps").prepend(accessDOM);
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
          var userIdMatch =
            cookie === newClap.userId ? $(addUserClap(newClap)) : $(addClap(newClap));
          userIdMatch.hide().prependTo("#claps").fadeIn("slow");
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
      return false; //prevents a linebreak being added with enter key
    }
  });

  $('body').on('click','.delButtons', function() {
    $(this).parent().fadeOut("slow", this.remove()); //remove is a callback so fade goes first
  });

}());
