async function fetchWeather() {
    const inputValue = document.getElementById("inputText").value;
    const outputDiv = document.getElementById("output");

    if (!inputValue) {
        outputDiv.innerHTML = "Please enter a location!";
        return;
    }

    const apiKey = "9d080ab600msh06f8f0a3e7987f8p137ae4jsnbe9a099d7071";
    const apiHost = "weatherbit-v1-mashape.p.rapidapi.com";
    const url = `https://${apiHost}/current?city=${encodeURIComponent(inputValue)}&units=imperial&lang=en`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "x-rapidapi-key": apiKey,
                "x-rapidapi-host": apiHost
            }
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        if (data.data && data.data.length > 0) {
            const weather = data.data[0];
            outputDiv.innerHTML = `
                <h3>Weather in ${weather.city_name}, ${weather.country_code}</h3>
                <p>Temperature: ${weather.temp}°F</p>
                <p>Weather: ${weather.weather.description}</p>
                <p>Wind Speed: ${weather.wind_spd} m/s</p>
            `;

            // Convert weather condition to lowercase
            const weatherCondition = weather.weather.description.toLowerCase();
            let newBackground = "";

            // Change background dynamically based on weather condition
            if (weatherCondition.includes("clear") || weatherCondition.includes("sunny")) {
                newBackground = "https://source.unsplash.com/1600x900/?sunny";
            } else if (weatherCondition.includes("rain") || weatherCondition.includes("shower")) {
                newBackground = "https://source.unsplash.com/1600x900/?rain";
            } else if (weatherCondition.includes("cloud")) {
                newBackground = "https://source.unsplash.com/1600x900/?cloudy";
            } else if (weatherCondition.includes("snow")) {
                newBackground = "https://source.unsplash.com/1600x900/?snow";
            } else {
                newBackground = "https://source.unsplash.com/1600x900/?weather";
            }

            // Apply background change
            document.body.style.backgroundImage = `url('${newBackground}')`;
            document.body.style.transition = "background-image 1s ease-in-out";
        } else {
            outputDiv.innerHTML = "No weather data found for this location.";
        }
    } catch (error) {
        outputDiv.innerHTML = `Error: ${error.message}`;
    }
}
