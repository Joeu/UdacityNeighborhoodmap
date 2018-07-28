var clickedMarker = null;
var markers = null;
var infoWindow = null;

var defaultIcon = "./img/markerDefault.png";
var highlightedIcon = "./img/markerHighlighted.png";
var clickedIcon = "./img/markerClicked.png";

var gErrorMessage = "Sadly we got an error with the latest google API request! :("

// Success callback from Google API
var initMap = function () {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -7.2290752, lng: -35.8808337 },
    zoom: 13,
    mapTypeControl: false
  });
  infoWindow = new google.maps.InfoWindow();
  setMarkers(initialLocations);
}

// Error callback from Google api
function handlingGoogleApiError(error) {
  alert(errorMessage + "<br><div>"+ error +"</div>");
}

function setMarkers(array) {
  markers = [];

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
    marker.addListener('mouseover', function () {
      this.setIcon(highlightedIcon);
    });
    marker.addListener('mouseout', function () {
      this.setIcon(defaultIcon);
    });
    marker.addListener('click', function () {
      let _markerLatLng = {
        location: {
          lat: marker.getPosition().lat(),
          lng: marker.getPosition().lng()
        }
      }

      let _markerScope = this;
      makeFoursquareRequest(_markerLatLng).then(function(response){
        populateInfoWindow(_markerScope, infoWindow, response.response.venues[0]);
      });
      marker.setIcon(clickedIcon);
    });

    // Push the marker to our array of markers.
    markers.push(marker);
  });

  showListings(markers);
}

function filterMarkers(filteredMarkers) {
  let _titlesFiltered = [];
  filteredMarkers.filter(function (element) {
    _titlesFiltered.push(element.title);
  });

  for (var i = 0; i < markers.length; i++) {
    if (_titlesFiltered.indexOf(markers[i].title) > -1) {
      markers[i].setMap(map);
    } else {
      markers[i].setMap(null);
    }
  }
}

function showListings(markers) {
  var bounds = new google.maps.LatLngBounds();
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

function showClickedMarkerInfo(marker, foursquareResponse) {
  let _currentMarker = markers.filter(function (element) {
    if (element.title == marker.title) {
      return element;
    }
  });

  // Simulating click event animation 
  _currentMarker[0].setIcon(clickedIcon);
  setTimeout(function(){_currentMarker[0].setIcon(defaultIcon);},300);
  
  populateInfoWindow(_currentMarker[0], infoWindow, foursquareResponse);
}

function populateInfoWindow(marker, infowindow, foursquareResponse) {
  if (infowindow.marker != marker) {
    infowindow.setContent('');
    infowindow.marker = marker;
    infowindow.addListener('closeclick', function () {
      infowindow.marker = null;
    });

    var streetViewService = new google.maps.StreetViewService();
    var radius = 50;
    function getStreetView(data, status) {
      if (status == google.maps.StreetViewStatus.OK) {
        var nearStreetViewLocation = data.location.latLng;
        var foursquareContent = foursquareResponse ? '<hr><div>' + foursquareResponse.hereNow.summary + '</div><div>Visits: ' + foursquareResponse.stats.visitsCount + '</div>'
                                : '<div>No Foursquare records</div>';
        var heading = google.maps.geometry.spherical.computeHeading(
          nearStreetViewLocation, marker.position);
        infowindow.setContent('<div id="infoContainer"><div>' + marker.title + '</div><hr><div id="pano"></div>' + foursquareContent + '</div>');
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