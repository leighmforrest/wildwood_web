var attractionMap;

function success(){
  var options = {
    center: new google.maps.LatLng(38.9918,-74.8149),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoom: 13
  };

  attractionMap = new google.maps.Map(document.getElementById('map'), options);
}

function error(){
    alert("Unable. Malfunction. Need input!");
}
