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

            // Change background dynamically
            if (weatherCondition.includes('sunny') || weatherCondition.includes('clear')) {
                document.body.style.backgroundImage = "url('https://www.w3schools.com/w3images/sun.jpg')";
            } else if (weatherCondition.includes('rain') || weatherCondition.includes('shower')) {
                document.body.style.backgroundImage = "url('https://www.w3schools.com/w3images/rainy.jpg')";
            } else {
                document.body.style.backgroundImage = "url('https://www.w3schools.com/w3images/clouds.jpg')";
            }
        } else {
            outputDiv.innerHTML = "No weather data found for this location.";
        }
    } catch (error) {
        outputDiv.innerHTML = `Error: ${error.message}`;
    }
}

