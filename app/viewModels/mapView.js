const initialLocations = [
  { title: 'The H Burger Club', location: { lat: -7.2208735, lng: -35.8829436 } },
  { title: 'Moires - Hambúrguer Rústico', location: { lat: -7.2264025, lng: -35.8954088 } },
  { title: 'Tartaruga Burguer', location: { lat: -7.2221133, lng: -35.8926421 } },
  { title: 'Burgiff Hamburgueria Artesanal', location: { lat: -7.2218311, lng: -35.8830308 } },
  { title: 'CHEF - Hamburgueria Artesanal', location: { lat: -7.222169, lng: -35.8842632 } }
];

var initMap = function(){
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -7.2290752, lng: -35.8808337},
    zoom: 13,
    mapTypeControl: false
  });

  setInitialMarkers(initialLocations);

}

function setInitialMarkers(array){
  var markers = [];
  var defaultIcon = makeMarkerIcon('0091ff');
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

