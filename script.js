(function(){
  "use strict";

  window.onload = function() {
    $.get( '/allClaps', function(data) {
      var obj = JSON.parse(data);
      var claps = obj.claps;
      for(var j = 0; j < claps.length; j++) {
        $("#claps").prepend(
          '<div class="clap">' + claps[j].message + '</div>'
        );
      }
    });
  };

  $('#submitButton').click(function() {
    $.post( '/addClap', $('#newClapInput').val(), function(data) {
      var clapJson = JSON.parse(data);
      $("#claps").prepend(
        '<div class="clap">' + clapJson.message + '</div>'
      );
    });
    $('#newClapInput').val('');
  });

}());
