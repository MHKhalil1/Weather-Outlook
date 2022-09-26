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

