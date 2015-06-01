$('#submitButton').click(function() {
  $.post( '/addClap', $("#newClapInput").val(), addClap(data));
});

addClap = function(data) {
  alert('posted');
};
