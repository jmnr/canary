(function(){
  "use strict";

  $('#submitButton').click(function() {
    $.post( '/addClap', $("#newClapInput").val(), addClap(data));
  });

  var addClap = function(data) {
    alert('posted');
  };

}());
