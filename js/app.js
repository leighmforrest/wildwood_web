console.log(attractionMap);

$(function(){
    /* Model */
    var Attraction = function(data){
      this.name = ko.observable(data.name);
      this.lat = ko.observable(data.lat);
      this.lng = ko.observable(data.lng);
      this.formattedAddress = ko.observable(data.formattedAddress);
      this.address = ko.computed(function(){
        return data.formattedAddress.join("\n")
      }, this);
    };

    /* ViewModel */
    var ViewModel = function(){
      var self = this;

      self.attractionList = ko.observableArray([]);
      // initialize the attractionList with application's data
      $.getJSON('https://api.foursquare.com/v2/venues/explore/?client_id=BEKYXBNXAGWHVZ3AMQXACNMYJS4SLYM21TIG5LCHFEVCSAK4&client_secret=NYOUFNLWUCROOT50TCGBJY3IAHNKULOEM15320FHKMRLFFB4&v=20161220&ne=39.003284, -74.782842&sw=38.968420, -74.866411&limit=25')
                         .done(function(data){
                            var items = data.response.groups[0].items;
                            items.forEach(function(item){
                              attraction = {};
                              attraction.name = item.venue.name;
                              attraction.lat = item.venue.location.lat;
                              attraction.lng = item.venue.location.lng;
                              attraction.formattedAddress = item.venue.location.formattedAddress;
                              self.attractionList.push(new Attraction(attraction));
                            });
                         })
                         .fail(function(){ // fallback method
                            alert("Foursquare data could not be loaded!")
                         })
                         .always(function(){
                            console.log(attractionMap);
                            self.resetDisplay();
                         });

      /* Search function*/
      self.filter = ko.observable();
      self.filteredAttractions = ko.computed(function(){
          // filter must be function by itself; do not use toLowerCase() here!
          var filter = self.filter();
          if(!filter){
            return self.attractionList();
          }else{
            // filter array if no text in search box
            return ko.utils.arrayFilter(self.attractionList(),
            function(attraction){
                return attraction.name().toLowerCase().indexOf(filter.toLowerCase()) !== -1;
            });
          }
      });

      self.display = ko.observableArray(self.filteredAttractions());

      self.displayedAttraction = function(attraction){
            self.display(attraction);
        };

      self.resetDisplay = function(){
        self.display(self.filteredAttractions());
      };

    }

    ko.applyBindings(new ViewModel);

    /* map code */


    /* GUI Code */
    $toggle = $(".toggle");
    $pins = $(".pins");

    $pins.hide();

    // Slider
    $toggle.click(function(){
      $('.pins').toggle("slide")
    });// End $toggle.click()
});
