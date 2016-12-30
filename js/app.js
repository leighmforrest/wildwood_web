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
