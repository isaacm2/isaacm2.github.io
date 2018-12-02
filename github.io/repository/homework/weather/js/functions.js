/* *************************************
*  Weather Site JavaScript Functions
************************************* */

//Test values for feels like temp
// const temp = 31;
// const speed = 5;
// buildWC(speed, temp);

//Test valuse for wind direction
// const direction = "E";
// windDial(direction);

//Test values for background image
// let currCondition = "sun";
// let keywordA = getCondition(currCondition);
// console.log(keywordA);
// changeSummaryImage(keywordA);

//Calculate wind chill
function buildWC(speed, temp){
    const feelTemp = document.getElementById("feels_temp");
    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
    console.log(wc);

    // Round the answer down to integer
    wc = Math.floor(wc);

    // If chill is greater than temp, return the temp
    wc = (wc > temp)?temp:wc;

    //Display the wind chill
    console.log(wc);
    feels_temp.innerHTML = "Feels Like: " + wc + "&deg;F";
}

//wind dial function
function windDial(direction){
    //Get the wind dial container
    const dial = document.getElementById("dial");
    console.log(direction);
    //Determine the dial class
    switch(direction){
        case "North":
        case "N" :
            dial.setAttribute("class", "n");
            break;
        case "NE":
        case "NNE":
        case "ENE":
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
            dial.setAttribute("class","se");
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

//Function to get the current condition to set background image
function getCondition(currentCondition){
    currentCondition = currentCondition.toLowerCase();
    var keyword = "";
    //Determine keyword to be returned
    if(currentCondition.includes("sun")||currentCondition.includes("clear")){
        keyword = "clear";
    }if(currentCondition.includes("cloud")||currentCondition.includes("overcast")){
        keyword = "cloud";
    }if(currentCondition.includes("fog")){
        keyword = "fog";
    }if(currentCondition.includes("rain")||currentCondition.includes("wet")||currentCondition.includes("thund")||currentCondition.includes("show")||currentCondition.includes("storm")){
        keyword = "rain";
    }if(currentCondition.includes("snow")||currentCondition.includes("flur")){
        keyword = "snow";
    }
    console.log(keyword);
    return keyword;

}

//Function to set summary image
function changeSummaryImage(keywordReturn){
    //Get the background element
    const bgImg = document.getElementById("background");
    console.log(keywordReturn);
    //Determin image for background and header for summary
    switch (keywordReturn){
        case "clear":
            bgImg.setAttribute("class","clear");
            document.getElementById("sum_image").setAttribute("src", "/weather/images/sunny-icon.png");
            // document.getElementById("summary").textContent = "Clear";
            break;
        case "cloud":
            bgImg.setAttribute("class","cloud");
            document.getElementById("sum_image").setAttribute("src", "/weather/images/cloudy-icon.png");
            // document.getElementById("summary").textContent = "Cloudy";
            break;
        case "fog":
            bgImg.setAttribute("class", "fog");
            document.getElementById("sum_image").setAttribute("src", "/weather/images/fog-icon.png");
            // document.getElementById("summary").textContent = "Foggy";
            break;
        case "rain":
            bgImg.setAttribute("class", "rain");
            document.getElementById("sum_image").setAttribute("src", "/weather/images/rain-icon.png");
            // document.getElementById("summary").textContent = "Rainy";
            break;
        case "snow":
            bgImg.setAttribute("class", "snow");
            document.getElementById("sum_image").setAttribute("src", "/weather/images/snow-icon.png");
            // document.getElementById("summary").textContent = "Snow";
            break;
    }
}
function getCode(LOCALE){
    const API_KEY = 'orJNIxgg8idpickIj4R3RnUVG5JzGDYA';
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
}

// Get Current Weather data from API
function getWeather(locData) {
    const API_KEY = 'orJNIxgg8idpickIj4R3RnUVG5JzGDYA';
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
    const API_KEY = 'orJNIxgg8idpickIj4R3RnUVG5JzGDYA';
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

// formats a value into a 12h AM/PM time string
function format_time(hour) {
    if(hour > 23){
      hour -= 24;
    }
    let amPM = (hour > 11) ? "pm" : "am";
    if(hour > 12) {
      hour -= 12;
    } else if(hour == 0) {
      hour = "12";
    }
    return hour + amPM;
} // end format_time function

//Setting of Hourly weather
function setHourly(locData){
   var curHour;

   let hourlyReceived = [locData.hourTemp1,locData.hourTemp2,locData.hourTemp3,locData.hourTemp4,locData.hourTemp5,locData.hourTemp6,locData.hourTemp7,locData.hourTemp8,locData.hourTemp9,locData.hourTemp10,locData.hourTemp11,locData.hourTemp12];
   curHour = locData.nextHour;
   hourEl = 1;
    console.log("nextHour within function");
    console.log(curHour);
    for(x=0;x<12;x++){
        document.getElementById("hour"+hourEl).innerHTML= format_time(curHour) + ":";
        document.getElementById("temp"+hourEl).innerHTML = hourlyReceived[x] + "&deg;F";
        hourEl+=1;
        curHour+=1;
    }
}
// Populate the current location weather page
function buildPage(locData){
    // Task 1 - Feed data to WC, Dial and Image functions
    
    // Task 2 - Populate location information
    
    // Task 3 - Populate weather information
    
    // Task 4 - Hide status and show main
    

    //Task 1
    //Add Wind Chill
    console.log("locData from buildPage");
    console.log(locData);
    let temp = locData.currentTemp;
    let speed = locData.windSpeed;
    buildWC(speed,temp);
    //Set wind dial
    windDial(locData.windDirection);
    //set image
    let sumImage = getCondition(locData.summary);
    console.log(sumImage);
    changeSummaryImage(sumImage);

    //Task 2
    document.getElementById("city").innerHTML = locData.name + ", " + locData.state;
    document.getElementById("zip").innerHTML = locData.postal;
    document.getElementById("elevate").innerHTML = locData.elevation;
    document.getElementById("lonlat").innerHTML = locData.geoposition;
    document.title = locData.name + ", " + locData.stateAbbr + " | Weather Site";

    //Task 3
    //Set Current, high, low temp
    document.getElementById("current_temp").innerHTML = locData.currentTemp+ "&deg;F";
    document.getElementById("high_temp").innerHTML = locData.pastHigh + "&deg;F";
    document.getElementById("low_temp").innerHTML = locData.pastLow + "&deg;F";
    //Set wind speed, direction, gust
    document.getElementById("wind_speed").innerHTML = locData.windSpeed + "mph";
    document.getElementById("gust").innerHTML = "Gusts: " + locData.windGust +"mph";
    document.getElementById("direct").innerHTML = "Direction: " + locData.windDirection;
    //Set summary section of current weather
    setHourly(locData);
    document.getElementById("summary").innerHTML = locData.summary;
    console.log("locData object item");
    console.log(locData.elevation);

    //Task 4
    document.getElementById("main-cont").setAttribute("class", "show");
    document.getElementById("status").setAttribute("class", "hide");
}