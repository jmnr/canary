function toggleSlide (num) {
  var elements = document.getElementsByClassName("tabs");
  var toMap = document.getElementById("toMap");
  var toFeed = document.getElementById("toFeed");
  elements[num].style.display = "none";
  if (num === 0) {
    elements[1].style.display = "block";
    toMap.style.background = "#ffff7e";
    toMap.style.color = "black";
    toFeed.style.background = "black";
    toFeed.style.color = "white";
  } else {
    elements[0].style.display = "block";
    toFeed.style.background = "#ffff7e";
    toFeed.style.color = "black";
    toMap.style.background = "black";
    toMap.style.color = "white";
  }
}
