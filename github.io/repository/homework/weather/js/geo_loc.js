// These functions will work tegether to obtain weather data and put it in a page
'use strict';
//Call the function to get location
getGeoLocation();




//Get longitude and latitude of current location
function getGeoLocation(){
    const STATUS = document.getElementById("status");
    STATUS.innerHTML = 'Getting location...';
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
         const LAT = position.coords.latitude;
         const LONG = position.coords.longitude;
      
         // Combine the values
         const LOCALE = LAT + "," + LONG;
         console.log(`Lat and Long are: ${LOCALE}.`);
         // Call getCode function, send locale
        getCode(LOCALE);
      
        })
       } else {
        STATUS.innerHTML = "Your browser doesn't support Geolocation or it is not enabled!";
       } // end else
}//end getGeoLocation
// URL to request city data using latitude and longitude
//https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=orJNIxgg8idpickIj4R3RnUVG5JzGDYA&q=43.81%2C-111.80&language=en-us&details=false&toplevel=false