var geolocation = {

  map: {},
  lat: undefined,
  lon: undefined,

  initialize: function(callback) {
    if (navigator.geolocation) {
      console.log("entered initialize");
      var position  = navigator.geolocation.getCurrentPosition(geolocation.showMap, geolocation.showError);
    }
    callback();
  },

  showMap: function(position) {
    geolocation.lat = position.coords.latitude;
    geolocation.lon = position.coords.longitude;
    console.log("lat:", geolocation.lat);
    console.log("long:", geolocation.lon);
    geolocation.map = L.map('mapContainer').setView([geolocation.lat, geolocation.lon], 15);
    var layer = new L.StamenTileLayer("toner-lite");
    // geolocation.map.addLayer(layer);
  },

  checkCoords: function(tweetObj) {
    if (tweetObj.hasOwnProperty("lat") && tweetObj.hasOwnProperty("lon") && tweetObj.lat !==undefined && tweetObj.lon !==undefined) {
      console.log("coordinates present");
      geolocation.addMarker(tweetObj);
    } else {
      console.log("no coordinates for this tweet");
    }
  },

  addMarker: function(tweet) {
    var marker = L.marker([tweet.lat, tweet.lon]).addTo(geolocation.map).bindPopup(tweet.message).openPopup;
  },

  // removeMarker: function(x,y)

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
        case error.UNKNOWN_ERRORkey:
            console.log("An unknown error occurred.");
            break;
    }
  },

};
