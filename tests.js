QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

test("check CSS is loading properly", function() {
  var content = getComputedStyle(document.getElementById('content'), null).margin;
  equal(content, '50px 100px', 'css is present');
});

// test("check clap appears when button is pressed", function() {
//   var clap = getComputedStyle(document.getElementById('content'), null).margin;
//   equal(clap, 'this is a test clap', 'claps being sent successfully');
// });
