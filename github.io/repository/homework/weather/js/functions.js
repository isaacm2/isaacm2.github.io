// Weather Site JavaScript Functions
// console.log('My javascript is being read.');

// Variables for Function Use
// const temp = 31;
// const speed = 5;
// buildWC(speed, temp);
// const direction = "NW"; // Set your own value
// windDial(direction);
// let curCondition ="blizzard";
// getCondition(curCondition);
// let sumImage = getCondition(curCondition);
// changeSummaryImage(sumImage);

// Calculate the Windchill
function buildWC(speed, temp){
    const feelTemp = document.getElementById('feelTemp');

    // Compute the windchill
    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);

    // Round the answer down to integer
    wc = Math.floor(wc);

    // If chill is greater than temp, return the temp
    wc = (wc > temp)?temp:wc;

    // Display the windchill
    console.log(wc);
    feelTemp.innerHTML = wc;
}

//Wind Dial Function
function windDial(direction){

    // Get the wind dial container
    const dial = document.getElementById("dial");

    // Determine the dial class
    switch (direction){
        case "North":
        case "N":
            dial.setAttribute("class", "n"); // "n" is the CSS rule selector
            break;
        case "NE":
        case "NNE":
        case "NEE":
            dial.setAttribute("class", "ne");
        break;
        case "NW":
        case "NNW":
        case "WNW":
            dial.setAttribute("class", "nw");
            break;
        case "South":
        case "S":
            dial.setAttribute("class", "s");
            break;
        case "SE":
        case "SSE":
        case "ESE":
            dial.setAttribute("class", "se");
            break;
        case "SW":
        case "SSW":
        case "WSW":
            dial.setAttribute("class", "sw");
            break;
        case "East":
        case "E":
            dial.setAttribute("class", "e");
            break;
        case "West":
        case "W":
            dial.setAttribute("class", "w");
            break;
    }
}

// The getCondition Function. This function changes the value of curCondition to a matching phrase.
function getCondition(curCondition) {
    // Let curWeather = document.getElementById("curWeather");
    curCondition = curCondition.toLowerCase();
    console.log(curCondition);
    
    switch (curCondition){
        case "pleasant":
        case "mostly clear":
        case "clear":
        case "sunny":
        case "blue skies":
        curCondition = "clear";
        // curWeather.setAttribute("class", "clear");
        break;
        case "cloudy":
        case "mostly cloudy":
        case "clouds":
        case "overcast":
        case "partly cloudy":
        curCondition = "clouds";
        // curWeather.setAttribute("class", "clouds");
        break;
        case "fog":
        case "mist":
        case "misty":
        case "foggy":
        curCondition = "fog";
        // curWeather.setAttribute("class", "fog");
        break;
        case "rain":
        case "wet":
        case "rainy":
        case "humid":
        case "drizzle":
        case "pouring":
        case "thunderstorm":
        case "thunderstorms":
        curCondition = "rain";
        // curWeather.setAttribute("class", "rain");
        break;
        case "snow":
        case "snowstorm":
        case "blizzard":
        case "flurries":
        case "snowy":
        curCondition = "snow";
        // curWeather.setAttribute("class", "snow");
        break;
    }
    console.log(curCondition);
    return curCondition;
}
// This function applies the image that matches the key phrase within one of the five weather categories.
function changeSummaryImage(sumImage){
    let curWeather = document.getElementById("curWeather");
    sumImage = sumImage.toLowerCase()
    console.log(sumImage);

    switch (sumImage){
        case "clear":
        curWeather.setAttribute("class", "clear");
        document.getElementById("clearImg").setAttribute("src", "/weather/images/optimized-imgs/clear-small.jpg");
        break;
        case "clouds":
        curWeather.setAttribute("class", "clouds");
        document.getElementById("clearImg").setAttribute("src", "/weather/images/optimized-imgs/clouds-small.jpg");
        break;
        case "fog":
        curWeather.setAttribute("class", "fog");
        document.getElementById("clearImg").setAttribute("src", "/weather/images/optimized-imgs/fog-small.jpg");
        break;
        case "rain":
        curWeather.setAttribute("class", "rain");
        document.getElementById("clearImg").setAttribute("src", "/weather/images/optimized-imgs/rain-small.jpg");
        break;
        case "snow":
        curWeather.setAttribute("class", "snow");
        document.getElementById("clearImg").setAttribute("src", "/weather/images/optimized-imgs/snow-small.jpg");
        break;
    }
    console.log(sumImage);
}

// Get location code from API
function getCode(LOCALE) {
    const API_KEY = 'tocvaQZQ6L0G6iM4BtLXGZs53opoGq9T';
    const URL = 'https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey='+API_KEY+'&q='+LOCALE;
    fetch(URL)
     .then(response => response.json())
     .then(function (data) {
      console.log('Json object from getCode function:');
      console.log(data);
      const locData = {}; // Create an empty object
      locData['key'] = data.Key; // Add the value to the object
      locData['name'] = data.LocalizedName;
      locData['postal'] = data.PrimaryPostalCode;
      locData['state'] = data.AdministrativeArea.LocalizedName;
      locData['stateAbbr'] = data.AdministrativeArea.ID;
      locData['geoposition'] = LOCALE;
      locData['elevation'] = data.GeoPosition.Elevation.Imperial.Value;
      getWeather(locData);
      })
     .catch(error => console.log('There was a getCode error: ', error))
  } // end getCode function

// Get Current Weather data from API
function getWeather(locData) {
    const API_KEY = 'tocvaQZQ6L0G6iM4BtLXGZs53opoGq9T';
    const CITY_CODE = locData['key']; // We're getting data out of the object
    const URL = "https://dataservice.accuweather.com/currentconditions/v1/"+CITY_CODE+"?apikey="+API_KEY+"&details=true";
    fetch(URL)
     .then(response => response.json())
     .then(function (data) {
      console.log('Json object from getWeather function:');
      console.log(data); // Let's see what we got back
      // Start collecting data and storing it
      locData['currentTemp'] = data[0].Temperature.Imperial.Value;
      locData['summary'] = data[0].WeatherText;
      locData['windSpeed'] = data[0].Wind.Speed.Imperial.Value;
      locData['windUnit'] = data[0].Wind.Speed.Imperial.Unit;
      locData['windDirection'] = data[0].Wind.Direction.Localized;
      locData['windGust'] = data[0].WindGust.Speed.Imperial.Value;
      locData['pastLow'] = data[0].TemperatureSummary.Past12HourRange.Minimum.Imperial.Value;
      locData['pastHigh'] = data[0].TemperatureSummary.Past12HourRange.Maximum.Imperial.Value;
      getHourly(locData); // Send data to getHourly function
      })
     .catch(error => console.log('There was an error: ', error))
  } // end getWeather function

// Get next 12 hours of forecast data from API
function getHourly(locData) {
    const API_KEY = 'tocvaQZQ6L0G6iM4BtLXGZs53opoGq9T';
    const CITY_CODE = locData['key'];
    const URL = "https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/"+CITY_CODE+"?apikey="+API_KEY;
    fetch(URL)
      .then(response => response.json())
      .then(function (data) {
      console.log('Json object from getHourly function:');
      console.log(data); // See what we got back
      // Get the first hour in the returned data
      let date_obj = new Date(data[0].DateTime);
      let nextHour = date_obj.getHours(); // returns 0 to 23
      // Store into the object
      locData["nextHour"] = nextHour;
      // Counter for the forecast hourly temps
      var i = 1;
      // Get the temps for the next 12 hours
      data.forEach(function (element) {
        let temp = element.Temperature.Value;
        let hour = 'hourTemp' + i;
        locData[hour] = temp; // Store hour and temp to object
        // New hiTemp variable, assign value from previous 12 hours
        let hiTemp = locData.pastHigh;
        // New lowTemp variable, assign value from previous 12 hours
        let lowTemp = locData.pastLow;
        // Check current forecast temp to see if it is 
        // higher or lower than previous hi or low
        if(temp > hiTemp){
          hiTemp = temp;
        } else if (temp < lowTemp){
          lowTemp = temp;
        }
        // Replace stored low hi and low temps if they changed
        if(hiTemp != locData.pastHigh){
          locData["pastHigh"] = hiTemp; // When done, this is today's high temp
        }
        if(lowTemp != locData.pastLow){
          locData["pastLow"] = lowTemp; // When done, this is today's low temp
        }
        i++; // Increase the counter by 1
      }); // ends the foreach method
      console.log('Finished locData object and data:');
      console.log(locData);
      buildPage(locData); // Send data to buildPage function
      })
      .catch(error => console.log('There was an error: ', error))
  } // end getHourly function


  // Populate the current location weather page
function buildPage(locData){
    // Task 1 - Feed AccuWeather data to WC, Dial and Image functions
    // Take data from Wind Chill and feed it into the wind chill function
    let temp = locData.currentTemp;
    let speed = locData.windSpeed;
    buildWC(speed, temp);
    // Feed AccuWeather data into Wind Dial function
    windDial (locData.windDirection);
    // Summary Image
    let sumImage = getCondition(locData.summary);
    console.log(sumImage);
    changeSummaryImage(sumImage);

    // Task 2 - Populate location information
    document.getElementById("locName").innerHTML = locData.name + ", " + locData.state;
    document.getElementById("zip").innerHTML = locData.postal;
    document.getElementById("elevation").innerHTML = locData.elevation;
    document.getElementById("geoLocation").innerHTML = locData.geoposition;
    document.title = locData.name + ", " + locData.stateAbbr + " | Weather Site";

    // Task 3 - Populate weather information
    document.getElementById("currentTempValue").innerHTML = locData.currentTemp;
    document.getElementById("highTempValue").innerHTML = locData.pastHigh;
    document.getElementById("lowTempValue").innerHTML = locData.pastLow;

    document.getElementById("windDirection").innerHTML = locData.windDirection;
    document.getElementById("windSpeedValue").innerHTML = locData.windSpeed;
    document.getElementById("gustValue").innerHTML = locData.windGust;

    document.getElementById("rain-title").innerHTML = locData.summary;
    console.log(locData.summary);

    // Task 4 - Hide status and show main
    document.getElementById("page-main").setAttribute("class", "show");
    document.getElementById("status").setAttribute("class", "hide");
    // For the search.html page
    document.getElementById("searchResults").setAttribute("class", "hide");
    }

    // Get location info, based on city key, from API
function getLocationByKey(cityKey) {
    const API_KEY = 'tocvaQZQ6L0G6iM4BtLXGZs53opoGq9T';
    const URL = 'https://dataservice.accuweather.com/locations/v1/'+cityKey+'?apikey='+API_KEY;
    fetch(URL)
     .then(response => response.json())
     .then(function (data) {
      console.log('Json object from getLocationByKey function:');
      console.log(data);
      const locData = {}; // Create an empty object
      locData['key'] = data.Key; // Add the value to the object
      locData['name'] = data.LocalizedName;
      locData['postal'] = data.PrimaryPostalCode;
      locData['state'] = data.AdministrativeArea.LocalizedName;
      locData['stateAbbr'] = data.AdministrativeArea.ID;
      let lat = data.GeoPosition.Latitude;
      let long = data.GeoPosition.Longitude;
      const LOCALE = lat+', '+long;
      locData['geoposition'] = LOCALE;
      locData['elevation'] = data.GeoPosition.Elevation.Imperial.Value;
      getWeather(locData);
      })
     .catch(error => console.log('There was a getLocationByKey error: ', error))
    } // end getLocationByKey function