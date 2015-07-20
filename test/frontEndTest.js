

test("CSS is loading properly", function() {
  var content = getComputedStyle(document.getElementById('content'), null).margin;
  equal(content, '50px 100px', 'css is present');
});

test("toggleSlide() switches tabs correctly", function() {
  toggleSlide(0);
  clapContainer = getComputedStyle(document.getElementById('clapContainer'), null).display;
  equal(clapContainer, 'none', 'tabs function correctly');
});
