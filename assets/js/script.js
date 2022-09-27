// Variables
var cityInputEl = document.getElementById("city-input");
var cityEl = document.getElementById("city");
var searchEl = document.getElementById("search-btn");
var historyEl = document.getElementById("history")
var containerEl = document.getElementById("container")
var forecastEl = document.getElementById("forecast")
var APIkey = "1f40db029d8aa5986ddf3ab9927c8d74";
var cities = []

// Function to load cities and store them
var loadCities = function() {
    var citiesLoaded = localStorage.getItem("cities")
    if(!citiesLoaded) {
        return false;
    }
    
    citiesLoaded = JSON.parse(citiesLoaded);
    
    for (var i=0; i < citiesLoaded.length; i++) {
        showSearchedCities(citiesLoaded[i])
        cities.push(citiesLoaded[i])
    }
}

// Function to save cities and store them
var saveCities = function() {
    localStorage.setItem("cities", JSON.stringify(cities));
}

// This function should allow the searched city to appear
var showSearchedCities = function(city) {
    var cityBoxEl = document.createElement("div");
    cityBoxEl.setAttribute("class", "card");
    var cityBoxNameEl = document.createElement("div");
    cityBoxNameEl.setAttribute("class", "card-body searched-city");
    cityBoxNameEl.textContent = city;
    
    cityBoxEl.appendChild(cityBoxNameEl)

    cityBoxEl.addEventListener("click", function () {
        receiveCityData(city)
    });

    historyEl.appendChild(cityBoxEl)

}

// This will show the most current data
var showCurrentData = function(city, data) {

    // This will show current data for the following 
    var tempCurrent = Math.round(data.current.temp);
    var humidity = Math.round(data.current.humidity);
    var windSpeed = data.current.wind_speed;
    var uvIndex = data.current.uvi;
    var iconCurrent = data.current.weather[0].icon;

    containerEl.textContent = ""
    containerEl.setAttribute("class", "m-3 border col-10 text-center")
    var divCityHeader = document.createElement("div")
    var headerCityDate = document.createElement("h2");
    var currentdate = moment().format("L");
    var imageIcon = document.createElement("img");
    imageIcon.setAttribute('src', "") 
    imageIcon.setAttribute('src', "https://openweathermap.org/img/wn/" + iconCurrent + "@2x.png")
    headerCityDate.textContent = city + "   (" + currentdate + ")";

    // This will append the data in the container
    divCityHeader.appendChild(headerCityDate)
    divCityHeader.appendChild(imageIcon)
    containerEl.appendChild(divCityHeader)


    // Weather data
    var divCurrent = document.createElement("div")
    var tempEl = document.createElement("p");
    var humidityEl = document.createElement("p");
    var windSpeedEl = document.createElement("p");
    var uvIndexEl = document.createElement ("p");
    var uvIndexColorEl = document.createElement("span")
    uvIndexColorEl.textContent = uvIndex
    // This function will change colors based on seriousness of uvIndex
        if (uvIndex <= 4) {
            uvIndexColorEl.setAttribute("class", "bg-success text-white p-2")
        } else if (uvIndex <= 8) {
            uvIndexColorEl.setAttribute("class","bg-warning text-black p-2")
        } else {
            uvIndexColorEl.setAttribute("class", "bg-danger text-white p-2")
        }
    
    tempEl.textContent = "Temperature: " + tempCurrent + "°F";
    humidityEl.textContent = "Humidity: " + humidity + "%";
    windSpeedEl.textContent = "Wind Speed: " + windSpeed + " MPH";
    uvIndexEl.textContent = "UV Index: ";

    uvIndexEl.appendChild(uvIndexColorEl)

    divCurrent.appendChild(tempEl);
    divCurrent.appendChild(humidityEl);
    divCurrent.appendChild(windSpeedEl);
    divCurrent.appendChild(uvIndexEl);

    containerEl.appendChild(divCurrent);
    
};

var displayForecastData = function(data) {
    console.log(data)
    forecastEl.textContent = "";
    var forecastHeaderEl = document.getElementById("five-day");
    forecastHeaderEl.textContent = "5-day Forecast:"

    // This is a loop for a 5 day forecast
    for (var i=1; i < 6; i++) {
        var tempForecast = Math.round(data.daily[i].temp.day);
        var humidityForecast = data.daily[i].humidity;
        var iconForecast = data.daily[i].weather[0].icon;
    
    // Elements for data
    var boxEl = document.createElement("div");
    boxEl.setAttribute("class","card col-xl-2 col-md-5 col-sm-10 mx-3 my-2 bg-primary text-white text-center");

    var boxBodyEl = document.createElement("div");
    boxBodyEl.setAttribute("class","card-body");

    var boxDateEl = document.createElement("h6");
    boxDateEl.textContent = moment().add(i, 'days').format("L");

    var boxIconEl = document.createElement("img");
    boxIconEl.setAttribute("src", "https://openweathermap.org/img/wn/" + iconForecast + "@2x.png")

    var boxTempEl = document.createElement("p");
    boxTempEl.setAttribute("class", "card-text");
    boxTempEl.textContent = "Temperature:  " + tempForecast + "°F";

    var boxHumidEl = document.createElement("p")
    boxHumidEl.setAttribute("class", "card-text");
    boxHumidEl.textContent = "Humidity:  " + humidityForecast + "%";
    
    // Appended to body
    boxBodyEl.appendChild(boxDateEl)
    boxBodyEl.appendChild(boxIconEl)
    boxBodyEl.appendChild(boxTempEl)
    boxBodyEl.appendChild(boxHumidEl)
    
    boxEl.appendChild(boxBodyEl);
    forecastEl.appendChild(boxEl);
    
    }
};

var receiveCityData = function(city) {
    event.preventDefault();
    
    var cityInfo = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIkey;

    fetch(cityInfo).then(function(response) {
        // Response is good = no error
        if (response.ok) {
            response.json().then(function(data) {
            console.log(data);

    var cityName = data.name;
    var latitude = data.coord.lat;
    var longitude = data.coord.lon;
    
    var prevSearch = cities.includes(cityName)
    if (!prevSearch) {
        cities.push(cityName)
        saveCities()
        showSearchedCities(cityName)
    }

    receiveWeatherData(cityName,latitude,longitude);

    });

    } else { 
        alert("That city wasn't found!")
        cityFormEl.reset()
     }
   });
};

var receiveWeatherData = function(city,latitude,longitude) { 
   
    var forecastInfo = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=imperial&exclude=minutely,hourly&appid=" + APIkey;
        
    fetch(forecastInfo).then(function(response) {
        response.json().then(function(data) {
            console.log(data);

        showCurrentData(city, data);
        displayForecastData(data);

        });
    });
};

loadCities()

cityEl.addEventListener("submit", function() {
    cityInputEl = cityInputEl.value.trim();
    receiveCityData(cityInputEl);
})