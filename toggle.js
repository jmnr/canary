function toggleSlide (num) {
  var elements = document.getElementsByClassName("tabs");
  elements[num].style.display = "none";
  if (num === 0) {
    elements[1].style.visibility = "visible";
  } else {
    elements[0].style.display = "block";
  }
}

function clickLocationButton (num) {
  if (num === 1) {
    addRemoveInputMap("inline-block");
    addRemoveSubmitButton("none");
    swapLocationButtons(num);
  } else {
    addRemoveInputMap("none");
    addRemoveSubmitButton("inline-block");
    swapLocationButtons(num);
  }
}

function addRemoveInputMap (display) {
  var inputMap = document.getElementById("inputMap");
  inputMap.style.display = display;
}

function addRemoveSubmitButton (display) {
  var submitButton = document.getElementById("submitButton");
  submitButton.style.display = display;
}

function swapLocationButtons (button) {
  var locationButtonOne = document.getElementById("locationButtonOne");
  var locationButtonTwo = document.getElementById("locationButtonTwo");
  if (button === 1) {
    locationButtonTwo.style.display = "inline-block";
    locationButtonOne.style.display = "none";
  } else {
    locationButtonTwo.style.display = "none";
    locationButtonOne.style.display = "inline-block";
  }
}
