(function(){
  "use strict";

  $('#submitButton').click(function() {
    $.post( '/addClap', $('#newClapInput').val(), function(data){
      console.log(data);
    });
  });

//   $.post( "test.php", { func: "getNameAndTime" }, function( data ) {
//   console.log( data.name ); // John
//   console.log( data.time ); // 2pm
// }, "json");
  // var addClap = function() {
  //   alert('posted');
  // };

}());
