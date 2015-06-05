test("check CSS is loading properly", function() {
  var content = getComputedStyle(document.getElementById('content'), null).margin;
  equal(content, '50px 100px', 'css is present');
});
