var geolocation = {

  var lat,
      lon;

  initialize: function() {
    if (navigator.geolocation) {
      console.log(entered initialize)
      var position  = navigator.geolocation.getCurrentPosition(setCoords(position))
    }
    else {
      console.log("Geolocation not supported");
    }
  },

  setCoords: function(position) {
    if (position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      console.log(lat);
      console.log(lon);
    }
  },

  // showError: function(error) {
  //   switch(error.code) {
  //       case error.PERMISSION_DENIED:
  //           x.innerHTML = "User denied the request for Geolocation."
  //           break;
  //       case error.POSITION_UNAVAILABLE:
  //           x.innerHTML = "Location information is unavailable."
  //           break;
  //       case error.TIMEOUT:
  //           x.innerHTML = "The request to get user location timed out."
  //           break;
  //       case error.UNKNOWN_ERROR:
  //           x.innerHTML = "An unknown error occurred."
  //           break;
  //   }
  // },

}

module.exports = geolocation;
