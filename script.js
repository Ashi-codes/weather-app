let apiKey = "756d9bdeace728f955c366cfd8be6ff1";

// Enter key support
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("city").addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            getWeather();
        }
    });
});

// 🌿 Background changer (calm + professional)
function setBackground(weather) {

    let body = document.body;

    body.classList.remove("sunny", "cloudy", "rainy", "hazy", "night");

    weather = weather.toLowerCase();

    if (weather.includes("rain")) {
        body.classList.add("rainy");
    }
    else if (weather.includes("cloud")) {
        body.classList.add("cloudy");
    }
    else if (weather.includes("clear")) {
        body.classList.add("sunny");
    }
    else if (
        weather.includes("haze") ||
        weather.includes("smoke") ||
        weather.includes("dust")
    ) {
        body.classList.add("hazy");
    }
    else {
        body.classList.add("cloudy");
    }
}

// 🌡 Smart readable weather text
function smartWeatherLabel(temp, desc) {

    desc = desc.toLowerCase();

    if (temp >= 40) return "🔥 Extreme Heat";
    if (temp >= 33) return "🌡️ Very Hot Weather";

    if (desc.includes("rain")) return "🌧️ Rainy Weather";
    if (desc.includes("cloud")) return "☁️ Cloudy Weather";

    if (desc.includes("haze") || desc.includes("smoke") || desc.includes("dust")) {
        return "🌫️ Hazy / Dusty Weather";
    }

    return desc;
}

// 🚀 MAIN FUNCTION
async function getWeather() {


    let city = document.getElementById("city").value.trim();

    if (city === "") {
        alert("Enter city name");
        return;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // Loader
    document.getElementById("result").innerHTML = `<div class="loader"></div>`;

    try {
        let response = await fetch(url);
        let data = await response.json();

        if (data.cod !== 200) {
            document.getElementById("result").innerHTML =
                `<p style="color:red;">⚠️ City not found</p>`;
            return;
        }

        let temp = Math.round(data.main.temp);
        let desc = data.weather[0].description;
        let icon = data.weather[0].icon;

        // 🌿 background change
        setBackground(desc);

        let weather = smartWeatherLabel(temp, desc);

        let iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

        document.getElementById("result").innerHTML = `
            <div class="card">
                <h2>${city.toUpperCase()}</h2>
                <img src="${iconUrl}" alt="weather icon">
                <h3>${temp}°C</h3>
                <p>${weather}</p>
            </div>
        `;

    } catch (error) {
        document.getElementById("result").innerHTML =
            `<p style="color:red;">Something went wrong ⚠️</p>`;
    }
}