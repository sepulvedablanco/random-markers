const NUM_MARKERS = 20000;

const MAX_LAT = 40.2165;
const MIN_LAT = 40.6165;

const MAX_LON = -3.50256;
const MIN_LON = -3.90256;

var map;
var fakeAssets = loadMarkers();

document.getElementById("draw-button").disabled = false;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.411335, lng: -3.674908},
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
}

function setMarkers() {
    var markers = [];
    var startTime = new Date();
    for (var i = 0 ; i < fakeAssets.length ; i++) {
      fakeAsset = fakeAssets[i];

      var marker = new google.maps.Marker({
        map: map,
          icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          position: new google.maps.LatLng(fakeAsset.lat, fakeAsset.lon),
          title: fakeAsset.title
      });
      
      google.maps.event.addListener(marker, 'click', handleMarkerClick.bind(undefined, marker, fakeAsset));
      markers.push(marker);
    }
    showElapsedTime(startTime);
    markerCluster = new MarkerClusterer(map, markers, {imagePath: 'images/m'});
}

function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}
function showElapsedTime(startTime) {
    var endTime = new Date();
    var timeDiff = endTime - startTime;
    timeDiff /= 1000;
    document.getElementById('time').innerHTML = timeDiff;
}

function loadMarkers() {
    var markers = []
    for (var i = 0 ; i < NUM_MARKERS ; i++) {
        fakeAsset = getFakeAsset(i);
        markers.push(fakeAsset);
    }
    return markers;
}

function getFakeAsset(num) {
    return {lat: getRandomLat(), lon: getRandomLon(), title: num + ' Random asset'};
}

function getRandomLat() {
    return Math.random() * (MAX_LAT - MIN_LAT) + MIN_LAT;
}

function getRandomLon() {
    return Math.random() * (MAX_LON - MIN_LON) + MIN_LON;
}

function handleMarkerClick(marker, fakeAsset) {
    if (typeof infowindow === 'undefined') {
        infowindow = new google.maps.InfoWindow({});
    }
  var contentString = getMarkerContent(fakeAsset);
    infowindow.setContent(contentString);
    infowindow.open(marker.getMap(), marker);
}

function getMarkerContent(fakeAsset) {
  var div = document.createElement('div');
  var html =  '<p>' + fakeAsset.title + '(' + fakeAsset.lat + ',' + fakeAsset.lon + ')</p>';
  div.innerHTML = html;
  return div;
}
