// Replace with your RapidAPI key
const API_KEY = "54ac6a634amsh2aedb0fce338e4bp17db43jsn83efbf191d92";
const API_HOST = "weatherapi-com.p.rapidapi.com";

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": API_KEY,
    "x-rapidapi-host": API_HOST,
  },
};

// Function to fetch weather data for a specific city
async function fetchWeather(city) {
  const url = `https://${API_HOST}/current.json?q=${city}`;
  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (data && data.current) {
      // Update weather details
      const temperature = data.current.temp_c;
      document.getElementById("Temperature").innerText = temperature + "°C";
      document.getElementById("CityName").innerText = data.location.name;
      document.getElementById("Wind_speed").innerText =
        data.current.wind_kph + " kph";
      document.getElementById("Humidity").innerText =
        data.current.humidity + "%";
      document.getElementById("Pressure").innerText =
        data.current.pressure_mb + " mb";

      // Save data to local storage for "Last Seen Weather"
      const lastSeen = {
        city: data.location.name,
        temperature: temperature + "°C",
        windSpeed: data.current.wind_kph + " kph",
        humidity: data.current.humidity + "%",
        pressure: data.current.pressure_mb + " mb",
        time: new Date().toLocaleString(),
      };
      localStorage.setItem("lastSeenWeather", JSON.stringify(lastSeen));

      // Update "Last Seen Weather" section
      updateLastSeenWeather();

      // Change background based on temperature
      updateBackground(temperature);
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

// Function to update the background based on temperature
function updateBackground(temperature) {
  let background = "";
  if (temperature > 30) {
    background = "linear-gradient(to top, #ff7e5f, #feb47b)"; // Hot
  } else if (temperature > 20) {
    background = "linear-gradient(to top, #87cefa, #4682b4)"; // Warm
  } else if (temperature > 10) {
    background = "linear-gradient(to top, #add8e6, #b0c4de)"; // Cool
  } else {
    background = "linear-gradient(to top, #1e3c72, #2a5298)"; // Cold
  }

  // Apply the background
  document.body.style.background = background;
}

// Function to update the "Last Seen Weather" section
function updateLastSeenWeather() {
  const lastSeen = JSON.parse(localStorage.getItem("lastSeenWeather"));
  if (lastSeen) {
    document.getElementById("LastSeenCity").innerText = lastSeen.city;
    document.getElementById("LastSeenTemp").innerText = lastSeen.temperature;
    document.getElementById("LastSeenWindSpeed").innerText = lastSeen.windSpeed;
    document.getElementById("LastSeenHumidity").innerText = lastSeen.humidity;
    document.getElementById("LastSeenPressure").innerText = lastSeen.pressure;
    document.getElementById("LastSeenTime").innerText = lastSeen.time;
  }
}

// Event listener for the search button
document.getElementById("searchButton").addEventListener("click", () => {
  const city = document.getElementById("citySearch").value.trim();
  if (city) {
    fetchWeather(city);
  } else {
    alert("Please enter a city name!");
  }
});

// Initial fetch for the default city
fetchWeather("Kolkata");

// Load "Last Seen Weather" on page load
updateLastSeenWeather();
