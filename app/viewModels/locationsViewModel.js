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