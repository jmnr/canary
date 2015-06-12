(function geolocation() {

  var map= {};
  var latitude;
  var longitude;

hub.listen("page loaded", function() {
      if (navigator.geolocation) {
        var position  = navigator.geolocation.getCurrentPosition(function(position) {
          hub.emit("coords recieved", position.coords);
        });
      }
});

hub.listen("coords recieved", function(coords) {
      geolocation.latitude = coords.latitude;
      geolocation.longitude = coords.longitude;
      // console.log("lat:", geolocation.latitude);
      // console.log("long:", geolocation.longitude);
      geolocation.map = L.map('mapContainer').setView([geolocation.latitude, geolocation.longitude], 15);
      geolocation.mapinput = L.map('inputMap').setView([geolocation.latitude, geolocation.longitude], 15);
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
          attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
          maxZoom: 18,
          id: 'msmichellegar.cc37dd7d',
          accessToken: 'pk.eyJ1IjoibXNtaWNoZWxsZWdhciIsImEiOiIxZTQyNTY3Y2VmYWIxYzc4NWE2MTk0NGExZGM4MzhmZSJ9.NU0hj0msBW3p9kGKm8Jylw'
      }).addTo(geolocation.map);
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
          attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
          maxZoom: 18,
          id: 'msmichellegar.cc37dd7d',
          accessToken: 'pk.eyJ1IjoibXNtaWNoZWxsZWdhciIsImEiOiIxZTQyNTY3Y2VmYWIxYzc4NWE2MTk0NGExZGM4MzhmZSJ9.NU0hj0msBW3p9kGKm8Jylw'
      }).addTo(geolocation.mapinput);
      hub.emit("new clap", {lat: geolocation.latitude, lon: geolocation.longitude}, geolocation.mapinput, {clickable: true, draggable: true});
      // geolocation.addMarker();
      hub.emit("main map loaded", geolocation.map);
});

hub.listen("new clap", function (tweet, map, options) {
      var marker = tweet.message ? new L.marker([tweet.lat, tweet.lon],options).addTo(map) : new L.marker([tweet.lat, tweet.lon],options).addTo(map).bindPopup(tweet.message).openPopup;
});

hub.listen("coords needed", function () {
    hub.emit("coords sent", geolocation.latitude, geolocation.longitude);
});

  // var addAllMarkers= function(markerCoords) {
  //   // var marker = new L.marker([tweet.lat, tweet.lon]).addTo(geolocation.map).bindPopup(tweet.message).openPopup;
  //   var markerArray = [];
  //   markerCoords.forEach(function(element) {
  //     markerArray.push(L.marker(element).addTo(geolocation.map));
  //     // .bindPopup(tweet.message).openPopup);
  //   });
  //   var group = L.featureGroup(markerArray).addTo(geolocation.map);
  //   geolocation.map.fitBounds(group.getBounds());
  // };

  // removeMarker: function(x,y)

  // var showError= function(error) {
  //   switch(error.code) {
  //       case error.PERMISSION_DENIED:
  //           console.log("User denied the request for Geolocation.");
  //           break;
  //       case error.POSITION_UNAVAILABLE:
  //           console.log("Location information is unavailable.");
  //           break;
  //       case error.TIMEOUT:
  //           console.log("The request to get user location timed out.");
  //           break;
  //       case error.UNKNOWN_ERRORkey:
  //           console.log("An unknown error occurred.");
  //           break;
  //   }
  // };

}());
