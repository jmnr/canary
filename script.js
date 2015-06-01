(function(){
  "use strict";

  $('#submitButton').click(function() {
    $.post( '/addClap', $('#newClapInput').val(), function(data) {
      data = JSON.parse(data.slice(0, data.length-3));
      console.log(data);
      $("#claps").append(
        '<div class="clap">' + data.message + '</div>'
      );
    });
  });

}());
