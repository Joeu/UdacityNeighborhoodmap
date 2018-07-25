// var clickedMarker = null;

// var LocationsViewModel = function(){
//   this.locationInput = ko.observable("");
//   this.allLocations = ko.observableArray(initialLocations);

//   this.filteredLocations = function(){
//     var filter = this.locationInput().toLowerCase();
//     if (!filter) {
//       return this.allLocations();
//     } else {
//       return ko.utils.arrayFilter(this.allLocations(), function (item) {
//         return stringStartsWith(item.title.toLowerCase(), filter);
//       });
//     }
//   }

//   this.setMarkerToDisplay = function(data){
//     clickedMarker = data;
//   }
  
//   this.allLocations.sort();
// };

// var VM = new LocationsViewModel();
// ko.applyBindings(VM);

// VM.locationInput.subscribe(function(){
//   VM.filteredLocations();
// });

// VM.allLocations.subscribe(function(){
//   VM.setMarkerToDisplay();
// });

// var stringStartsWith = function (string, startsWith) {          
//   string = string || "";
//   if (startsWith.length > string.length)
//       return false;
//   return string.substring(0, startsWith.length) === startsWith;
// };