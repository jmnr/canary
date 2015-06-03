(function(){
  "use strict";

  var addClap = function (data) {
    return '<div class="clap">' +
      '<p>' + data.message + '</p>' +
      '<p>' + data.time + '</p>' +
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
    $.get('/allClaps', function(data) {
      var claps = sortClaps(JSON.parse(data));
      var accessDOM = '';
      for(var i = 0; i < claps.length; i++) {
        accessDOM += addClap(claps[i]);
      }

      $("#claps").prepend(accessDOM);
    });
  };

  $('#submitButton').click(function() {
    if($('#newClapInput').val().length !== 0) {
      $.post( '/addClap', $('#newClapInput').val(), function(data) {
        var newClap = JSON.parse(data);
        $(addClap(newClap)).hide().prependTo("#claps").fadeIn("slow");
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

}());
