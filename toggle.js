function toggleSlide (num) {
  var elements = document.getElementsByClassName("tabs");
  elements[num].style.display = "none";
  if (num === 0) {
    elements[1].style.display = "block";
  } else {
    elements[0].style.display = "block";
  }
}
