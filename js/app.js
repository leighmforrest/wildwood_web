$(function(){
    var ViewModel = function(){
        var self = this;

        self.attractions = ko.observableArray(attractionList);
        /* Search function*/
        self.filter = ko.observable();
        self.filteredAttractions = ko.computed(function(){
            // filter must be function by itself; do not use toLowerCase() here!
            var filter = self.filter();
            if(!filter){
              return self.attractions();
            }else{
              // filter array if no text in search box
              return ko.utils.arrayFilter(self.attractions(),
              function(attraction){
                  return attraction.name().toLowerCase().indexOf(filter.toLowerCase()) !== -1;
              });
            }
        });

        console.log(self.filteredAttractions())
    };

    ko.applyBindings(new ViewModel);

    /* GUI Code */
    $toggle = $(".toggle");
    $pins = $(".pins");

    $pins.hide();

    // Slider
    $toggle.click(function(){
      $('.pins').toggle("slide")
    });// End $toggle.click()

});
