(function(){
  "use strict";

  document.onload = function() {
    $.get( '/allClaps', function(data) {
      var claps = JSON.parse(data);
      for(var j = 0; j < claps.length; j++) {
        $("#claps").prepend(
          '<div class="clap">' + claps[i].message + '</div>'
        );
      }
    });
  };

  $('#submitButton').click(function() {
    $.post( '/addClap', $('#newClapInput').val(), function(data) {
      console.log(data);
      var clapJson = JSON.parse(data);
      console.log(clapJson);
      $("#claps").prepend(
        '<div class="clap">' + clapJson.message + '</div>'
      );
    });
    $('#newClapInput').val('');
  });

}());
