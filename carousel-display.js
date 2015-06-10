  function toggleSlide () {
    var elements = document.getElementsByClassName("tabs");
    var visibleID = getVisible(elements);
    elements[visibleID].style.display = "none";
    if (visibleID === 0) {
      elements[1].style.display = "block";
    } else {
      elements[0].style.display = "block";
    }
  }

  function getVisible (elements) {
      var visibleID = 0;
      for(var i = 0; i < elements.length; i++) {
          if(elements[i].style.display === "block") {
              visibleID = i;
          }
      }
      return visibleID;
  }
