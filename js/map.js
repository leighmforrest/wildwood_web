/*
    Array of attractions. Note: Attraction object holds a reference to a markers
    object.
*/
var attractionList = [];
var map;


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

// Define a constructor for an Attraction.
function Attraction(data){
    this.name = ko.observable(data.name);
    this.lat = ko.observable(data.lat);
    this.lng = ko.observable(data.lng);
    this.marker;
    this.infowindow = new google.maps.InfoWindow({
    content: this.name()
  });
};

// Method adds a reference to a marker
Attraction.prototype.addMarker = function (marker){
    this.marker = marker;
}

Attraction.prototype.addClickEvent = function (f){
    // Note: make sure the passed in function can access this!
    google.maps.event.addListener(this.marker, 'click', f.bind(this));
};

/* Function creates an Attraction, creates a marker, and returns Attraction. */
function addAttraction(data){
    var attraction = new Attraction(data);
    var marker = addMarker(data);
    attraction.addMarker(marker);
    attraction.addClickEvent(function() {this.infowindow.open(map, marker);});
    return attraction;
}

/* Creates a marker and returns it in order to add reference to it in an
   Attraction model. */
function addMarker(location) {
    // create a marker
    var marker = new google.maps.Marker({
      position: {lat: location.lat, lng: location.lng},
      map: map,
      animation:google.maps.Animation.DROP
    });

    return marker;
}
