/*
    Array of attractions. Note: Attraction object holds a reference to a markers
    object.
*/
var attractionList = [];
var map;


function initMap() {
  var center = {lat: 38.98586, lng:-74.82464};
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: center
  });
  // Get the data from the API. Foursquare API is used.
  $.get('https://api.foursquare.com/v2/venues/explore/?client_id=BEKYXBNXAGWHVZ3AMQXACNMYJS4SLYM21TIG5LCHFEVCSAK4&client_secret=NYOUFNLWUCROOT50TCGBJY3IAHNKULOEM15320FHKMRLFFB4&v=20161220&ne=39.003284, -74.782842&sw=38.968420, -74.866411&limit=25')
                           .done(function(data){
                              var items = data.response.groups[0].items;
                              items.forEach(function(item){
                                attraction = {};
                                attraction.name = item.venue.name;
                                attraction.lat = item.venue.location.lat;
                                attraction.lng = item.venue.location.lng;
                                attraction.formattedAddress = item.venue.location.formattedAddress;
                                attractionList.push(addAttraction(attraction));
                              });
                           })
                           .fail(function(){ // fallback method
                              alert("Foursquare data could not be loaded!")
                           })
                           .always(function(){

                           });

  // initialize the markers and attractionList arrays
  // attractions.forEach(function(attraction){
  //     attractionList.push(addAttraction(attraction));
  // });

}

/*Handle an error when attempting to load the map API. */
function error(){
    alert("The Google Maps API could not be loaded.");
}

/* Define a constructor for an Attraction. Attraction needs to be in global scope
   to be accessed by/access map.
*/
function Attraction(data){
    this.name = ko.observable(data.name);
    this.lat = ko.observable(data.lat);
    this.lng = ko.observable(data.lng);
    this.formattedAddress = ko.observable(data.formattedAddress);
    this.marker;
    this.infowindow = new google.maps.InfoWindow({
    content: this.name() + "\n" + this.formattedAddress()
  });
};

// Method adds a reference to a marker
Attraction.prototype.addMarker = function (marker){
    this.marker = ko.observable(marker);
}

// Method adds a handler to the marker's click event. f is a function.
Attraction.prototype.addClickEvent = function (f){
    // Note: make sure the passed in function can access this!
    google.maps.event.addListener(this.marker(), 'click', f.bind(this));
};

/* Function creates an Attraction, creates a marker, and returns Attraction. */
function addAttraction(data){
    var attraction = new Attraction(data);
    var marker = addMarker(data);
    attraction.addMarker(marker);
    attraction.addClickEvent(function() {
      // Set animation to BOUNCE and set time out for one cycle.
      marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function(){ marker.setAnimation(null); }, 750);
      // Open up the infowindow
      this.infowindow.open(map, marker);});
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
