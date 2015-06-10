var geolocation = {

  map: {},

  initialize: function() {
    hub.listen("page loaded", function() {
      if (navigator.geolocation) {
        console.log("entered initialize");
        var position  = navigator.geolocation.getCurrentPosition(function(position) {
          hub.emit("coords recieved", position.coords.latitude, position.coords.longitude);
        });
      }
      else {
        console.log("Geolocation not supported");
      }
    });
  },

  showMap: function() {
    hub.listen("coords recieved", function(lat, lon) {
      geolocation.lat = lat;
      geolocation.lon = lon;
      console.log("lat:", geolocation.lat);
      console.log("long:", geolocation.lon);
      geolocation.map = L.map('map').setView([geolocation.lat, geolocation.lon], 60);
      var layer = new L.StamenTileLayer("toner-lite");
      geolocation.map.addLayer(layer);
      hum.emit("map loaded");
    });
  },

  addMarker = function(x, y, map) {
    var marker = L.marker([x, y]).addTo(map);
    var marker = L.marker([x, y]).addTo(map) .bindPopup('Sort of the center of Bend.') .openPopup;
  },


  showError: function(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            console.log("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.");
            break;
    }
  }

};

hub.listen("coords recieved", geolocation.showMap);
