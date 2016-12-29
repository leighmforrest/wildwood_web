$(function(){
    /* ViewModel Code */
    /* GUI Code */
    $toggle = $(".toggle");
    $pins = $(".pins");

    $pins.hide();

    // Slider
    $toggle.click(function(){
          $('.pins').toggle("slide");
    });// End $toggle.click()

});
