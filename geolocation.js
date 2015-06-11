var geolocation = {

  map: {},
  lat: undefined,
  lon: undefined,

  initialize: function(callback) {
    if (navigator.geolocation) {
      console.log("entered initialize");
      var position  = navigator.geolocation.getCurrentPosition(geolocation.showMap, geolocation.showError)
    }
    callback();
  },

  showMap: function(position) {
    geolocation.lat = position.coords.latitude;
    geolocation.lon = position.coords.longitude;
    console.log("lat:", geolocation.lat);
    console.log("long:", geolocation.lon);
    geolocation.map = L.map('map').setView([geolocation.lat, geolocation.lon], 15);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'msmichellegar.cc37dd7d',
        accessToken: 'pk.eyJ1IjoibXNtaWNoZWxsZWdhciIsImEiOiIxZTQyNTY3Y2VmYWIxYzc4NWE2MTk0NGExZGM4MzhmZSJ9.NU0hj0msBW3p9kGKm8Jylw'
    }).addTo(geolocation.map);
    // var layer = new L.StamenTileLayer("toner-lite");
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
    var marker = L.marker([tweet.lat, tweet.lon]).addTo(geolocation.map).bindPopup(tweet.message).openPopup();
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
        case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.")
            break;
    }
  },

};
