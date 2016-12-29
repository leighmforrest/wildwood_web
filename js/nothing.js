var map, i, marker, myinfowindow, ViewModel;


function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 51.2785215,
            lng: 1.0790438
        },
        zoom: 16,
        styles: styles
    });

    myinfowindow = new google.maps.InfoWindow();

    for (i = 0; i < locations.length; i++) {
        var cafeTitles = locations[i].title;
        var cafePositions = locations[i].location;
        //console.log(locations[i]); // check
        marker = new google.maps.Marker({
            map: map,
            title: cafeTitles,
            position: cafePositions,
        });
        (function(marker, cafeTitles) {

            // When a marker is clicked
            google.maps.event.addListener(marker, "click", function() {
                myinfowindow.open(map, marker);
                //console.log(cafeTitles); //check
                myinfowindow.setContent(cafeTitles);
                marker.setIcon({
                    url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
                });
            });
        })(marker, cafeTitles);
    }


            //The ViewModel
    ViewModel = function() {
        var self = this;
        self.myOA = ko.observableArray();
        self.filter = ko.observable('');

        // this is the second for-loop locations[i] that i make
        //Is there a way a can store locations[i] in a var then use it or something like that?
        for (i = 0; i < locations.length; i++) {
            self.myOA.push(locations[i]);
            //console.log(locations[i].title.toLowerCase());
        }

        console.log(self.myOA());
        console.log(self.myOA().title);
        self.filteredLocations = ko.computed(function(){
            var filter = self.filter().toLowerCase();
            if(!filter){
                return self.myOA();
            } else {
                return ko.utils.arrayFilter(self.myOA(), function(place){
                    return place.title.toLowerCase().indexOf(filter) !== -1;
                });
            }
        });

    };
    ko.applyBindings(new ViewModel());
}
