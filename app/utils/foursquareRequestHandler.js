let CLIENT_ID = "MTTGWYPDNXGDHZXXMTPQWJFGSDB2MDVO3NRBVNSXMRSQZKIS";
let CLIENT_SECRET = "1X0PIZROIBNTT1T3A3B02VC3CUKXJPXG4IFTEWCFOCVZNSZI";

let baseUrl = "https://api.foursquare.com/v2/venues/search?limit=1&client_id="+CLIENT_ID+"&client_secret="+CLIENT_SECRET+"&v=20140715&ll=";
var fErrorMessage = "Sadly we got an error with the latest foursquare API request! :("

// Making a GET request to get information about the place
function makeFoursquareRequest(locationData){
  let latLong = locationData.location.lat + "," + locationData.location.lng;
  let _finalUrl = baseUrl + latLong;

  var dfd = jQuery.Deferred();

  return $.getJSON(_finalUrl, function(data) { 
    dfd.resolve(data.response.venues[0]);
  }, function(error){
    alert(errorMessage + "<br><div>"+ error +"</div>");
    dfd.reject(error);
  });

}