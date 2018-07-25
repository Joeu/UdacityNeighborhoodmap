const initialLocations = [
  { title: 'The H Burger Club', location: { lat: -7.2208735, lng: -35.8829436 } },
  { title: 'Moires - Hambúrguer Rústico', location: { lat: -7.2264025, lng: -35.8954088 } },
  { title: 'Tartaruga Burguer', location: { lat: -7.2221133, lng: -35.8926421 } },
  { title: 'Burgiff Hamburgueria Artesanal', location: { lat: -7.2218311, lng: -35.8830308 } },
  { title: 'CHEF - Hamburgueria Artesanal', location: { lat: -7.222169, lng: -35.8842632 } },
  { title: 'Texas Hamburgueria Artesanal', location: { lat: -7.2147381, lng: -35.8819365 } },
  { title: 'La Cucina 150 Ristorante', location: { lat: -7.2225154, lng: -35.8843565 } }
];

var clickedMarker = null;
var markers = null;
var infoWindow = null;

var initMap = function(){
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -7.2290752, lng: -35.8808337},
    zoom: 13,
    mapTypeControl: false
  });
  infoWindow = new google.maps.InfoWindow();
  setInitialMarkers(initialLocations);
}

function setInitialMarkers(array){
  markers = [];
  var defaultIcon = makeMarkerIcon('0091ff');
  var highlightedIcon = makeMarkerIcon('FFFF24');

  array.forEach(element => {
    var position = element.location;
    var title = element.title;
    // Create a marker per location, and put into markers array.
    var marker = new google.maps.Marker({
      position: position,
      title: title,
      animation: google.maps.Animation.DROP,
      icon: defaultIcon,
      id: array.indexOf(element)
    });
    
    // Markers listeners
    marker.addListener('mouseover', function() {
      this.setIcon(highlightedIcon);
    });
    marker.addListener('mouseout', function() {
      this.setIcon(defaultIcon);
    });
    marker.addListener('click', function() {
      populateInfoWindow(this, infoWindow);
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    });
    
    // Push the marker to our array of markers.
    markers.push(marker);
  });

  showListings(markers);
}

function makeMarkerIcon(markerColor) {
  var markerImage = new google.maps.MarkerImage(
    'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
    '|40|_|%E2%80%A2',
    new google.maps.Size(21, 34),
    new google.maps.Point(0, 0),
    new google.maps.Point(10, 34),
    new google.maps.Size(21,34));
  return markerImage;
}

function showListings(markers) {
  var bounds = new google.maps.LatLngBounds();
  // Extend the boundaries of the map for each marker and display the marker
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
    bounds.extend(markers[i].position);
  }
  map.fitBounds(bounds);
}

function hideListings() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
}

function showClickedMarkerInfo(marker){
  let _currentMarker = markers.filter(function(element){
    if (element.title == marker.title){
      return element;
    }
  });

  populateInfoWindow(_currentMarker[0], infoWindow)
}

function populateInfoWindow(marker, infowindow) {
  if (infowindow.marker != marker) {
    infowindow.setContent('');
    infowindow.marker = marker;
    // Make sure the marker property is cleared if the infowindow is closed.
    infowindow.addListener('closeclick', function () {
      infowindow.marker = null;
    });

    var streetViewService = new google.maps.StreetViewService();
    var radius = 50;
    function getStreetView(data, status) {
      if (status == google.maps.StreetViewStatus.OK) {
        var nearStreetViewLocation = data.location.latLng;
        var heading = google.maps.geometry.spherical.computeHeading(
          nearStreetViewLocation, marker.position);
        infowindow.setContent('<div>' + marker.title + '</div><hr><div id="pano"></div>');
        var panoramaOptions = {
          position: nearStreetViewLocation,
          pov: {
            heading: heading,
            pitch: 10
          }
        };
        var panorama = new google.maps.StreetViewPanorama(
          document.getElementById('pano'), panoramaOptions);
      } else {
        infowindow.setContent('<div>' + marker.title + '</div>' +
          '<div>No Street View Found</div>');
      }
    }
    streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
    // Open the infowindow on the correct marker.
    infowindow.open(map, marker);
  }
}