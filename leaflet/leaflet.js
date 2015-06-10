// getting long and lat of current location, setting to divs in html

var geo = {};

console.log("hey");


navigator.geolocation.getCurrentPosition(function(response){
        var lat = response.coords.latitude;
        var lon = response.coords.longitude;
        geo.lat = lat;
        geo.lon = lon;
        document.getElementById("lat").innerHTML += lat;
        document.getElementById("lon").innerHTML += lon;
        console.log(geo);
});

// setting up map

var map = L.map('map').setView([51.5295407, -0.0422945], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'msmichellegar.cc37dd7d',
    accessToken: 'pk.eyJ1IjoibXNtaWNoZWxsZWdhciIsImEiOiIxZTQyNTY3Y2VmYWIxYzc4NWE2MTk0NGExZGM4MzhmZSJ9.NU0hj0msBW3p9kGKm8Jylw'
}).addTo(map);

var marker = L.marker([51.5295407, -0.0422945]).addTo(map);
marker.bindPopup("<b>Founders & Coders</b><br>I am a popup.").openPopup();

// getting the long and lat of where the mouse clicks

var clickedLocation;

map.on('click', function(e) {
  clickedLocation = e.latlng;
  console.log(clickedLocation);
});
