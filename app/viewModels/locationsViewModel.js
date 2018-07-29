// View Model
var LocationsViewModel = function(){
  this.locationInput = ko.observable("");
  this.allLocations = ko.observableArray(initialLocations);

  // Filtering locations
  this.filteredLocations = function(){
    var filter = this.locationInput().toLowerCase();
    
    let filterResult = initialLocations.filter(function(element){
      return stringStartsWith(element.title.toLowerCase(), filter);
    });
    this.allLocations(filterResult);
    filterMarkers(filterResult);
  }

  // Setting correct marker to be displayed
  this.setMarkerToDisplay = function(data){
    makeFoursquareRequest(data)
    .then(function(response) {
      showClickedMarkerInfo(data, response.response.venues[0]);
    })
    .fail(function() {
      showClickedMarkerInfo(data, fErrorMessage);
    });
  }
  
  this.allLocations.sort();
};

var VM = new LocationsViewModel();
ko.applyBindings(VM);

VM.locationInput.subscribe(function(){
  VM.filteredLocations();
});