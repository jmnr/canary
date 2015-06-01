$('#submitButton').click(function() {
  $.post( '/addClap', $("#newClapInput").val(), addClap(clapData));
});

addClap = function(clapData) {
  alert('posted');
};
