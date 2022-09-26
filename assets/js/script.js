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

    divCityHeader.appendChild(headerCityDate)
    divCityHeader.appendChild(imageIcon)
    currentContainerEl.appendChild(divCityHeader)