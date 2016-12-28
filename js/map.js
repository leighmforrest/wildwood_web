// Create an object literal of locations
//var markers = []; // Array of markers.
/*
    Array of attractions. Note: Attraction object holds a reference to a markers
    object.
*/
var attractionList = [];
var map;

// Define a constructor for an Attraction.
function Attraction(data){
    this.name = data.name;
    this.lat = data.lat;
    this.lng = data.lng;
    this.marker;
};

// Method adds a reference to a marker
Attraction.prototype.addMarker = function (marker){
    this.marker = marker;
}

function initMap() {
  var center = {lat: 38.98586, lng:-74.82464};
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: center
  });

  // initialize the markers and attractionList arrays
  attractions.forEach(function(attraction){
      attractionList.push(addAttraction(attraction));
  });
}

/* Creates a marker and returns it in order to add reference to it in an
   Attraction model. */
function addMarker(location) {
    // create a marker
    var marker = new google.maps.Marker({
      position: {lat: location.lat, lng: location.lng},
      map: map
    });

    return marker;
}

/* Function creates an Attraction, creates a marker, and returns Attraction. */
function addAttraction(data){
    var attraction = new Attraction(data);
    var marker = addMarker(data);
    attraction.addMarker(marker);
    return attraction;
}
