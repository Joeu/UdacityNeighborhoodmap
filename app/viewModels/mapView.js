var initMap = function(){
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -7.2290752, lng: -35.8808337},
    zoom: 13,
    mapTypeControl: false
  });
}

var LocationsViewModel = function(){
  this.locationInput = ko.observable("");
  this.allLocations = ko.observableArray([]);

  this.addLocation = function(){
    if (this.locationInput() != ""){
      this.allLocations.push(this.locationInput());
      this.locationInput("");
    }
  }
  
  this.allLocations.sort();
};

ko.applyBindings(new LocationsViewModel());

