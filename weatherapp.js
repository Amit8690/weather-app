const searchLocation = document.querySelector("input");
const searchBTN = document.querySelector("#search");
const place = document.querySelector(".city");

searchBTN.addEventListener("click" ,  async (event) => {
           event.preventDefault(); 
        
        const city = searchLocation.value;
if (city != "")
{
    place.textContent = searchLocation.value;
    searchLocation.value = "";
    const data = await getWeather(city);
    const date = new Date(data.current.time);

const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
};

    document.querySelector('.date').textContent =
    date.toLocaleDateString('en-IN', options); 
    const temp = document.querySelector("#temperature");
    const humidity = document.querySelector("#humidity");
    temp.textContent = data.current.temperature_2m + "°C";
    humidity.textContent = data.current.relative_humidity_2m + "%";
      const weatherIcon = document.querySelector(".mainIcon");
      const weatherCondition = document.querySelector("#condition");

     if(data.current.weather_code === 0)
     {
        weatherIcon.src = "icons8-sunny-weather-48.png"
        weatherCondition.textContent = "Clear Sky";
     }
     else if(data.current.weather_code === 1)
     {
        weatherIcon.src = "partiallycloudy.png"
        weatherCondition.textContent = "partily cloudy";
     }
     else if(data.current.weather_code ===2)
     {
        weatherIcon.src = "partiallycloudy.png";
        weatherCondition.textContent = "partly cloudy";

     }
     else if (data.current.weather_code ===3)
     {

        weatherIcon.src = "cloudy only.png";
        weatherCondition.textContent = "Cloudy"
     }
else if (data.current.weather_code >= 51 && data.current.weather_code <= 67)
{
     weatherIcon.src = "raining.png";
     weatherCondition.textContent = "rain";
}

}
}
);

async function getWeather(city) {

    // Step 1: Find latitude and longitude
    const geoURL =
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;

        console.log("URL being fetched:", geoURL);
        console.log("got latitudes and longitudes");

    const geoResponse = await fetch(geoURL);

    console.log("geoResponse received" , geoResponse);

    const geoData = await geoResponse.json();
   console.log("geo data received" , geoData);
    const latitude = geoData.results[0].latitude;
    const longitude = geoData.results[0].longitude;
    
    console.log("latitude" ,  latitude)
    console.log("longitude" , longitude);

    // Step 2: Get weather using coordinates
    const weatherURL =
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code`;

        console.log("got the weather");
        console.log("weather URL" , weatherURL);

   const weatherResponse = await fetch(weatherURL);
    console.log("weather response" , weatherResponse);
    const weatherData = await weatherResponse.json();
    console.log("weather data" , weatherData);
    console.log("Temperature:", weatherData.current.temperature_2m);
    console.log("Humidity:", weatherData.current.relative_humidity_2m);
    
return weatherData;
}
