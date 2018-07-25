// View Model
var LocationsViewModel = function(){
  this.locationInput = ko.observable("");
  this.allLocations = ko.observableArray(initialLocations);

  this.filteredLocations = function(){
    var filter = this.locationInput().toLowerCase();
    if (!filter) {
      return this.allLocations();
    } else {
      return ko.utils.arrayFilter(this.allLocations(), function (item) {
        return stringStartsWith(item.title.toLowerCase(), filter);
      });
    }
  }

  this.setMarkerToDisplay = function(data){
    showClickedMarkerInfo(data);
  }
  
  this.allLocations.sort();
};

var VM = new LocationsViewModel();
ko.applyBindings(VM);

VM.locationInput.subscribe(function(){
  VM.filteredLocations();
});

VM.allLocations.subscribe(function(){
  VM.setMarkerToDisplay();
});