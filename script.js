(function(){
  "use strict";

  $('#submitButton').click(function() {
    $.post( '/addClap', $('#newClapInput').val(), function(data) {
      $("#claps").append(
        '<div class="clap">' + data + '</div>'
      );
    });
  });



}());
