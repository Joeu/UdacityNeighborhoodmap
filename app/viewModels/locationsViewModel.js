var LocationsViewModel = function(){
  this.locationInput = ko.observable("");
  this.allLocations = ko.observableArray(initialLocations);

  this.addLocation = function(){
    if (this.locationInput() != ""){
      let _currentLocation = {title: this.locationInput()}
      // if location exists
      this.allLocations.push(_currentLocation);
      this.locationInput("");
    }
  }
  
  this.allLocations.sort();
};

ko.applyBindings(new LocationsViewModel());