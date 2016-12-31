/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(2);
	module.exports = __webpack_require__(3);


/***/ },
/* 1 */
/***/ function(module, exports) {

	/* This file contains small amounts of DOM manipulation, nothing more. */
	$(function(){

	    /* GUI Code */
	    $toggle = $(".toggle"); // The hamburger-ish div element.
	    $pins = $(".pins"); // List items are named "$pins"

	    $pins.hide();

	    // Slide the search box and the list into view.
	    $toggle.click(function(){
	          $('.pins').toggle("slide");
	    });// End $toggle.click()
	});


/***/ },
/* 2 */
/***/ function(module, exports) {

	/* The application markers, hard-coded. */
	var attractions = (function(){
	  return [
	    {name: "Key West Cafe",
	     address: "4701 Pacific Ave.",
	     town: "Wildwood",
	     lat: 38.9835,
	      lng: -74.8217},
	      {name: "Kona Surf Company",
	       address: "103 E. Rio Grande Ave.",
	       town: "Wildwood",
	       lat: 38.9841,
	       lng: -74.8243},
	      {name: "Beach Creek Oyster Bar and Grille",
	       address: "500 W Hand Ave.",
	       town: "Wildwood",
	       lat: 38.9878,
	       lng: -74.8306},
	    {name: "Ice Hot Teppanyaki",
	     address: "3012 Boardwalk",
	     town: "Wildwood",
	     lat: 38.988676,
	      lng: -74.807339},
	    {name: "Mariner's Landing",
	     address: "3501 Boardwalk",
	     town: "Wildwood",
	     lat: 38.9861,
	     lng: -74.8100},
	     {name: "George F. Boyer Museum",
	      address: "3907 Pacific Ave",
	      town: "Wildwood",
	      lat: 38.987345,
	      lng: -74.816559},
	    {name: "Larkins Restaurant",
	     address: "2600 New Jersey Ave",
	     town: "Wildwood",
	     lat: 38.9944,
	     lng: -74.8104},
	     {name: "Yoga on the Beach",
	      address: "4501 Boardwalk",
	      town: "Wildwood",
	      lat: 38.979980,
	      lng: -74.817098},
	    {name: "Hereford Inlet Lighthouse",
	     address: "111 N. Central Ave",
	     town: "North Wildwood",
	     lat: 39.0068,
	     lng: -74.7916},
	    {name: "Cattle N' Clover",
	     address: "3817 Pacific Ave",
	     town: "Wildwood",
	     lat: 38.9876,
	     lng: -74.8160},
	    {name: "Curley's Fries",
	     address: "2416 Boardwalk",
	     town: "Wildwood",
	     lat: 38.9899,
	     lng: -74.8040},
	    {name: "Jellyfish Cafe",
	     address: "5911 New Jersey Ave",
	     town: "Wildwood",
	     lat: 38.9788,
	     lng: -74.8316},
	     {name: "Zippy's Bikes",
	      address: "3900 Pacific Ave",
	      town: "Wildwood",
	      lat: 38.9876,
	      lng: -74.8167}
	  ];

	}())


/***/ },
/* 3 */
/***/ function(module, exports) {

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

	    // Google map intialization.
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


	        // Create the click listener.
	        (function(marker, attraction) {

	            // When a marker is clicked, give the marker its content.
	            google.maps.event.addListener(marker, "click", function() {

	                markers.forEach(function(current_marker){
	                    if(current_marker !== marker){
	                        current_marker.setVisible(false);
	                    }
	                });

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
	                        /*  Note: API query only returns one result, yet it is an array.
	                        There may be more tips on the website, and more for different
	                        types of requests, but this venue search only returns one. */
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
	                        attractionInfoWindow.setContent("You are unable to connect to the Foursquare API.");
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

	/* The ViewModel for the application */
	ViewModel = function() {
	    var self = this;
	    self.attractionList = ko.observableArray();
	    self.filter = ko.observable('');

	    // Add the attractions array to attractionList, one by one
	    for (i = 0; i < attractions.length; i++) {
	        self.attractionList.push(attractions[i]);
	    }

	    // Function that filters the application.
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

	    /* Method to display all the markers. */
	    self.resetDisplay = function(){
	        markers.forEach(function(marker){
	          marker.setVisible(true);
	        });
	      };
	};

	// Ready for action!
	ko.applyBindings(new ViewModel());

	/* Handle an error when attempting to load the map API. */
	function error() {
	    alert("The Google Maps API could not be loaded.");
	}


/***/ }
/******/ ]);