const apiKey = "238e87e1713b51fb38efda8922e59935";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");


const checkWeather = async (city) => {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if (!response.ok) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
            return;
        }

        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";

        const weatherCondition = data.weather[0].main.toLowerCase();
        const weatherImages = {
            clouds: "images/Clouds.png",
            clear: "images/Clear.png",
            rain: "images/Rain.png",
            drizzle: "images/Drizzle.png",
            haze: "images/Haze.png"
        };

        const imageUrl = weatherImages[weatherCondition] || "images/Default.png";
        document.querySelector(".card").style.backgroundImage = `url(${imageUrl})`;


        document.querySelector(".error").style.display = "none";
        document.querySelector(".weather").style.display = "block";

    } catch (error) {
        console.error("Failed to fetch data: ", error);
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})

searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});
