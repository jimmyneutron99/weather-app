async function fetchWeather() {
    const inputValue = document.getElementById("inputText").value;
    const outputDiv = document.getElementById("output");

    if (!inputValue) {
        outputDiv.innerHTML = "<p>Please enter a location!</p>";
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

            // Determine background image based on weather description
            const weatherCondition = weather.weather.description.toLowerCase();
            let newBackground = "";

            if (weatherCondition.includes("clear") || weatherCondition.includes("sunny")) {
                newBackground = "https://www.w3schools.com/w3images/sun.jpg";
            } else if (weatherCondition.includes("rain") || weatherCondition.includes("shower")) {
                newBackground = "https://www.w3schools.com/w3images/rainy.jpg";
            } else if (weatherCondition.includes("snow")) {
                newBackground = "https://www.w3schools.com/w3images/snow.jpg";
            } else if (weatherCondition.includes("storm") || weatherCondition.includes("thunder")) {
                newBackground = "https://www.w3schools.com/w3images/storm.jpg";
            } else {
                newBackground = "https://www.w3schools.com/w3images/clouds.jpg";
            }

            // Apply background change
            document.body.style.backgroundImage = `url('${newBackground}')`;
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundPosition = "center";
            document.body.style.transition = "background-image 1s ease-in-out";

            console.log("Background Updated:", newBackground);
        } else {
            outputDiv.innerHTML = "<p>No weather data found for this location.</p>";
        }
    } catch (error) {
        outputDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

