test("check CSS is loading properly", function() {
  var content = getComputedStyle(document.getElementById('content'), null).margin;
  equal(content, '50px 100px', 'css is present');
});

test("check carousel switches properly", function() {
  equal('clicking tab function', 'display: none', 'tabs function correctly');
});
