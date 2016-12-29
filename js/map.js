/*
    Array of attractions. Note: Attraction object holds a reference to a markers
    object.
*/
var map;
var markers = [];
var atractionInfoWindow;


function initMap() {
    var center = {lat: 38.98586, lng:-74.82464};
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: center
    });

    myinfowindow = new google.maps.InfoWindow();

    for (i = 0; i < attractions.length; i++) {
    //console.log(locations[i]); // check
    var attraction = attractions[i];
    marker = new google.maps.Marker({
        map: map,
        title: attraction.title,
        position: {lat: attraction.lat, lng: attraction.lng},
    });

    // add marker to markers
    markers.push(marker);
    (function(marker, attraction) {

        // When a marker is clicked
        google.maps.event.addListener(marker, "click", function() {
            myinfowindow.open(map, marker);
            console.log(attraction); //check
            myinfowindow.setContent(attraction.name);
            // marker.setIcon({
            //     url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
            // });
        });
    })(marker, attraction);
}

}

ViewModel = function() {
    var self = this;
    self.attractionList = ko.observableArray();
    self.filter = ko.observable('');

    // this is the second for-loop locations[i] that i make
    //Is there a way a can store locations[i] in a var then use it or something like that?
    for (i = 0; i < attractions.length; i++) {
        self.attractionList.push(attractions[i]);
        //console.log(locations[i].title.toLowerCase());
    }

    console.log(self.attractionList());
    console.log(self.attractionList().title);
    self.filteredAttractions = ko.computed(function(){
        // filter must be function by itself; do not use toLowerCase() here!
        var filter = self.filter();
        if(!filter){
          // make all markers visible
          for (var i = 0; i < markers.length; i++) {
            markers[i].setVisible(true);
        }
          return self.attractionList();
        }else{
          // filter array if no text in search box
          return ko.utils.arrayFilter(self.attractionList(),
          function(attraction, i){
              var found = attraction.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
              markers[i].setVisible(found);
              return found;
          });
        }
    });
};

ko.applyBindings(new ViewModel());

/*Handle an error when attempting to load the map API. */
function error(){
    alert("The Google Maps API could not be loaded.");
}
