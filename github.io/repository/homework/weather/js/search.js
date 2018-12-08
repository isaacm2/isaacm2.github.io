'use strict'

// Get the query element from the DOM
const QUERY = document.getElementById("query");

// Listen for search entries, get matching locations
QUERY.addEventListener("keyup", function () {
    let searchValue = QUERY.value;
    // Call the processJSON function to request data and build results
    processJSON(searchValue);
   }); // ends the eventListener

   // Request data and build the list of matching locations
function processJSON(searchValue) {
    // Get Data from the Autocomplete API
    const API_KEY = "tocvaQZQ6L0G6iM4BtLXGZs53opoGq9T";
    let URL = "https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=" + API_KEY + "&q=" + searchValue;
    // Show the search page's searchResults div if it's visible just before displaying the weather data.
    document.getElementById("searchResults").getAttribute("class", "show");
    fetch(URL)
    .then(response => response.json())
    .then(function (data) {
    console.log('Json object from autocomplete API:');
    console.log(data); // Log what is returned
      
      // Build a list of returned locations
      let list = '<ul>';
      for (let i = 0, n = data.length; i < n; i++) {
        let cityKey = data[i].Key;
        let cityName = data[i].LocalizedName;
        let stateCode = data[i].AdministrativeArea.ID;
        let locationName = cityName+', '+stateCode;
        list += "<li><a data-key='" + cityKey + "' href='https://www.accuweather.com/ajax-service/select-city?cityId=" + cityKey + "&lang=en-us' title='See weather information for " + locationName + "' target='_blank'>" + locationName + "</a></li>";
      };
      list += '</ul>';
      // Inject the list to the search page
      let searchResults = document.getElementById("searchResults");
      searchResults.innerHTML = list;
    })  .catch(error => console.log('There was an error: ', error))
  } // ends the processJSON function

// Call on search event
const searchListen = document.getElementById("searchResults");
// Add event listener
searchListen.addEventListener('click', function(evt) {
  let cityKey = evt.target.dataset['key'];
  console.log(cityKey);
  if(cityKey != null){
    evt.preventDefault();
    getLocationByKey(cityKey);
    // end of searchListen
  }
});