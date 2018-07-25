var LocationsViewModel = function(){
  this.locationInput = ko.observable("");
  this.allLocations = ko.observableArray(initialLocations);

  // this.addLocation = function(){
  //   if (this.locationInput() != ""){
  //     let _currentLocation = {title: this.locationInput()}
  //     // if location exists
  //     this.allLocations.push(_currentLocation);
  //     this.locationInput("");
  //   }
  // }

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
  
  this.allLocations.sort();
};

var VM = new LocationsViewModel();
ko.applyBindings(VM);

VM.locationInput.subscribe(function(){
  VM.filteredLocations();
});

var stringStartsWith = function (string, startsWith) {          
  string = string || "";
  if (startsWith.length > string.length)
      return false;
  return string.substring(0, startsWith.length) === startsWith;
};