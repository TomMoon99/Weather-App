//selecting elements


const iconElement = document.querySelector(".weather_icon");
const tempElement = document.querySelector(".temperature_value p");
const descElement = document.querySelector(".temperature_description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");



    //app data

const weather = {};

weather.temperature = {
    
    unit : "celsius"
    
}

    //app consts and variables

const KELVIN =273;  //conversion

    //api key

const key = "8eca3a798c6e85ea55727e9f0c82615d";

    //checks if the browser supports geolcation

if("geolocation" in navigator){
    
    navigator.geolocation.getCurrentPosition(setPosition, showError);
    
}else{
    
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p> Browser does not support Geolocation <p>";

}

//set users position 

function setPosition(position){
    
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
       
    getWeather(latitude, longitude);
}


//show error

function showError(error){
    
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} <p>`;
    
}

//get the weather fcrom the api

function getWeather(latitude, longitude){
    
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    fetch(api)
        .then(function(response){
              let data = response.json();
              return data;
            })
        .then(function(data){    // this updates our weather objects
              weather.temperature.value = Math.floor(data.main.temp - KELVIN);
              weather.description = data.weather[0].description;
              weather.iconId= data.weather[0].icon;
              weather.city = data.name;
              weather.country = data.sys.country;
              
            })
        .then(function(){
            
            displayWeather();
        });
    
}

//display weather to the user interface

function displayWeather(){
    
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
    
    
}

//celsius to farenheit conversion

function celsiusToFahrenheit(temperature){
    
    return (temperature * 9/5) + 32;
    
}

//when user clicks the temperature switch between celsius and fahrenheit

tempElement.addEventListener("click", function(){
    
    if(weather.temperature.value === undefined) return;
    
    if(weather.temperature.unit == "celsius"){
        
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        farenheit = Math.floor(fahrenheit);
        
        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
        
    }else{
        
         tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
         weather.temperature.unit = "celsius";
    }
    
});




//background colour button

function myFunction(){
    
    var x = Math.floor(Math.random()*256);
    var y = Math.floor(Math.random()*256);
    var z = Math.floor(Math.random()*256);
    var bgColor = "rgb(" + x + "," + y + "," + z + ")";
    
    document.body.style.background=bgColor;
    
     myFunction(); 
}


                                    
                         
















