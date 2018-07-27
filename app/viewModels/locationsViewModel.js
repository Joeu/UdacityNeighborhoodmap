// View Model
var LocationsViewModel = function(){
  this.locationInput = ko.observable("");
  this.allLocations = ko.observableArray(initialLocations);

  this.filteredLocations = function(){
    var filter = this.locationInput().toLowerCase();
    
    let filterResult = initialLocations.filter(function(element){
      return stringStartsWith(element.title.toLowerCase(), filter);
    });
    this.allLocations(filterResult);
    filterMarkers(filterResult);
  }

  this.setMarkerToDisplay = function(data){
    makeFoursquareRequest(data.location).then(function(response){
      showClickedMarkerInfo(data, response.response.venues[0]);
    });
  }
  
  this.allLocations.sort();
};

var VM = new LocationsViewModel();
ko.applyBindings(VM);

VM.locationInput.subscribe(function(){
  VM.filteredLocations();
});