/*
    map: reference to the map.
    markers: the markers.
    attractionInfoWindow: The InfoWindow that displays attraction info.
*/
var map;
var markers = [];
var attractionInfoWindow;

function initMap() {
    var center = {
        lat: 38.98586,
        lng: -74.82464
    };

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: center
    });

    attractionInfoWindow = new google.maps.InfoWindow();

    // For each attraction, make the marker and add the event listener.
    for (i = 0; i < attractions.length; i++) {
        var attraction = attractions[i];
        console.log(attraction.name);
        marker = new google.maps.Marker({
            map: map,
            title: attraction.name,
            address: attraction.address,
            town: attraction.town,
            position: {
                lat: attraction.lat,
                lng: attraction.lng
            },
        });

        // add marker to markers
        markers.push(marker);
        (function(marker, attraction) {
            // When a marker is clicked
            google.maps.event.addListener(marker, "click", function() {
                var content = "<h4>" + marker.title + "</h4><p>" + marker.address + "</p>";
                content += "<p>" + marker.town + "</p><h5>Tips:</h5>";
                // Ajax call begin
                $.ajax({
                    url: "https://api.foursquare.com/v2/venues/explore/",
                    data: {
                        client_id: "BEKYXBNXAGWHVZ3AMQXACNMYJS4SLYM21TIG5LCHFEVCSAK4",
                        client_secret: "NYOUFNLWUCROOT50TCGBJY3IAHNKULOEM15320FHKMRLFFB4",
                        v: 20161230,
                        near: "Wildwood, NJ",
                        query: marker.title
                    },
                    success: function(data) {

                        var tips = data.response.groups[0].items[0].tips;
                        // Note: API query only returns one result, yet it is an array.
                        if(tips){
                          tips.forEach(function(tip) {
                              content += "<p>" + tip.text + "</p>";
                          });
                        }else{
                            // There may be no tips for venue.
                            content += "<p>No tips for this attraction.</p>";
                        }
                        attractionInfoWindow.setContent(content);
                    },
                    error: function() {
                        attractionInfoWindow.setContent("Unable. Malfunction. Need Input!");
                    },
                }); // End Ajax call

                marker.setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(function() {
                    marker.setAnimation(null);
                }, 750);
                attractionInfoWindow.open(map, marker);
            });
        })(marker, attraction);
    }

}


ViewModel = function() {
    var self = this;
    self.attractionList = ko.observableArray();
    self.filter = ko.observable('');
    self.streetView = ko.observable("");

    // this is the second for-loop locations[i] that i make
    //Is there a way a can store locations[i] in a var then use it or something like that?
    for (i = 0; i < attractions.length; i++) {
        self.attractionList.push(attractions[i]);
        //console.log(locations[i].title.toLowerCase());
    }

    self.filteredAttractions = ko.computed(function() {
        // filter must be function by itself; do not use toLowerCase() here!
        var filter = self.filter();
        if (!filter) {
            // make all markers visible
            for (var i = 0; i < markers.length; i++) {
                markers[i].setVisible(true);
            }
            return self.attractionList();
        } else {
            // filter array if no text in search box
            return ko.utils.arrayFilter(self.attractionList(),
                function(attraction, i) {
                    var found = attraction.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
                    markers[i].setVisible(found);
                    return found;
                });
        }
    });

    /* Method to open info window on a clicked list item. */
    this.openInfo = function(thisList) {
        for (var i = 0; i < markers.length; i++) {
            if (thisList.name === markers[i].title) {
                // show the infowindow
                markers[i].setVisible(true);
                google.maps.event.trigger(markers[i], 'click');
            } else {
                markers[i].setVisible(false);
            }
        }
    };
};

// Ready for action!
ko.applyBindings(new ViewModel());

/*Handle an error when attempting to load the map API. */
function error() {
    alert("The Google Maps API could not be loaded.");
}
