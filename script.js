(function(){
  "use strict";

  $('#submitButton').click(function() {
    $.post( '/addClap', $('#newClapInput').val(), function(data) {
      console.log(data);
      var clapJson = JSON.parse(data);
      console.log(clapJson);
      $("#claps").append(
        '<div class="clap">' + clapJson.message + '</div>'
      );
    });
  });

}());
