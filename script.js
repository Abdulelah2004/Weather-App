const apiKey = "e82f93b1f15ee788ceb37cf9e7f2d937";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherSection = document.querySelector(".weather");
const errorSection = document.querySelector(".error");

async function checkWeather(city) {
  if (!city.trim()) {
    showError("Please enter a city name.");
    return;
  }

  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (!response.ok) {
      showError("City not found. Please try again.");
      return;
    }

    const data = await response.json();
    console.log(data);

    // Show weather and hide error
    errorSection.style.display = "none";
    weatherSection.style.display = "block";

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    // Set icon based on weather
    const condition = data.weather[0].main;

    if (condition === "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (condition === "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (condition === "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (condition === "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (condition === "Mist") {
      weatherIcon.src = "images/mist.png";
    } else {
      weatherIcon.src = "images/default.png"; // Optional fallback image
    }

  } catch (error) {
    showError("Something went wrong. Please check your internet connection.");
    console.error("Fetch error:", error);
  }
}

// Handle button click
searchBtn.addEventListener("click", () => {
  const city = searchBox.value;
  checkWeather(city);
});

// Show error and hide weather
function showError(message) {
  errorSection.querySelector("p").innerText = message;
  errorSection.style.display = "block";
  weatherSection.style.display = "none";
}



searchBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkWeather(searchBox.value);
  }
});

