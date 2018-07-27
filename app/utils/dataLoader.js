var initialLocations = [];

function fillLocations(data) {
  data.forEach(element => {
    let _newLoc = new LocationModel(element);
    initialLocations.push(_newLoc);
  });
}

fillLocations(mockedJsonData);