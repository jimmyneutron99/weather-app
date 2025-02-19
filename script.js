async function fetchData() {
    const inputValue = document.getElementById("inputText").value;
    const outputDiv = document.getElementById("output");

    const url = "rapidapi.com"; // Replace with actual API URL
    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": "9d080ab600msh06f8f0a3e7987f8p137ae4jsnbe9a099d7071", // Replace with your RapidAPI key
            "X-RapidAPI-Host": "weatherbit-v1-mashape.p.rapidapi.com" // Replace with actual API host
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        
        outputDiv.innerHTML = `API Response: ${JSON.stringify(data)}`;
    } catch (error) {
        outputDiv.innerHTML = `Error: ${error.message}`;
    }
}

