

test("CSS is loading properly", function() {
  var content = getComputedStyle(document.getElementById('content'), null).margin;
  equal(content, '50px 100px', 'css is present');
});

test("toggleSlide(0) switches tabs correctly", function() {
  toggleSlide(0);
  clapContainer = getComputedStyle(document.getElementById('clapContainer'), null).display;
  equal(clapContainer, 'none', 'tabs function correctly');
});

test("addRemoveInputMap('none') adds map to the page", function () {
  addRemoveInputMap("none");
  inputMap = getComputedStyle(document.getElementById('inputMap'), null).display;
  equal(inputMap, 'none', 'addInputMap adds map');
});

test("addRemoveSubmitButton('none') removes submit clap button from page", function () {
  addRemoveSubmitButton('none');
  clapButton = getComputedStyle(document.getElementById('submitButton'), null).display;
  equal(clapButton, 'none', 'addInputMap removes submitButton');
});

test("addRemoveSubmitButton('inline-block') adds submit clap button to page", function () {
  addRemoveSubmitButton('inline-block');
  clapButton = getComputedStyle(document.getElementById('submitButton'), null).display;
  equal(clapButton, 'inline-block', 'addInputMap removes submitButton');
});

test("swapLocationButtons(1) swaps to locationButtonTwo", function () {
  swapLocationButtons(1);
  locationButtonOne = getComputedStyle(document.getElementById('locationButtonOne'), null).display;
  equal(locationButtonOne, 'none', 'addInputMap removes locationButtonOne');
});

test("swapLocationButtons(2) swaps to locationButtonOne", function () {
  swapLocationButtons(2);
  locationButtonTwo = getComputedStyle(document.getElementById('locationButtonTwo'), null).display;
  equal(locationButtonTwo, 'none', 'addInputMap removes locationButtonOne');
});
