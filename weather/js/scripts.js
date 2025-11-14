// references to HTML elements
const parentTag = document.querySelector('#weatherCard');

// writing a default zipcode
let zip = localStorage.getItem('myZipcode');
if (zip == null) {
    const defaultZip = "83202";
    localStorage.setItem('myZipcode', defaultZip);
    zip = defaultZip;
}

console.log(zip);

// setting the path to the API on weather
const myKey = "cf01851479c0a6063a80b1b3863fd3f1";
const myPath = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${myKey}&units=imperial`;

console.log("FETCHING:", myPath);

// fetch the remote JSON data for the current weather 
fetch(myPath)
.then((response) => response.json())
.then((allData) => {
    console.log(allData);
    currentWeather(allData);
})
.catch(err => console.log("FETCH ERROR:", err));

// function that displays the current weather
function currentWeather(weatherResults){
    console.log(weatherResults);
    console.log(weatherResults.main.temp);
    console.log(weatherResults.weather[0].icon);

    // add the correct town name 
    const myTown = document.querySelector('#town');
    myTown.textContent = `Weather for ${weatherResults.name}`;

    // current date 
    const myDate = document.createElement('p');
    myDate.className = "date";
    const d = new Date();
    myDate.textContent = d.toDateString();
    parentTag.appendChild(myDate);

    // current icon
    const myWeatherIcon = document.createElement('img');
    myWeatherIcon.className = "weather-icon";
    myWeatherIcon.src = `https://openweathermap.org/img/wn/${weatherResults.weather[0].icon}@2x.png`;
    myWeatherIcon.alt = weatherResults.weather[0].description;
    myWeatherIcon.style.width = "100px";
    myWeatherIcon.style.height = "100px";
    myWeatherIcon.style.display = "block";
    myWeatherIcon.style.margin = "0.5rem auto";

// append it last so it appears at the bottom
parentTag.appendChild(myWeatherIcon);

document.body.appendChild(myWeatherIcon);
    parentTag.appendChild(myWeatherIcon);

    // current temperature
    const myCurrentTemp = document.createElement('p');
    myCurrentTemp.className = "temperature";
    myCurrentTemp.innerHTML = weatherResults.main.temp + "&deg;F";
    parentTag.appendChild(myCurrentTemp);

     // current humidity
     const myCurrentHumidity = document.createElement('p');
     myCurrentHumidity.className = "humidity";
     myCurrentHumidity.innerHTML = `Humidity: ${weatherResults.main.humidity}%`; 
     parentTag.appendChild(myCurrentHumidity);

     // max temperature
     const myMaxTemp = document.createElement('p');
     myMaxTemp.className = "max-temperature";
     myMaxTemp.innerHTML = `Max Temperature: ${weatherResults.main.temp_max}&deg;F`; 
     parentTag.appendChild(myMaxTemp);

     // min temperature
     const myMinTemp = document.createElement('p');
     myMinTemp.className = "min-temperature";
     myMinTemp.innerHTML = `Min Temperature: ${weatherResults.main.temp_min}&deg;F`; 
     parentTag.appendChild(myMinTemp);

      // wind speed
     const myWindSpeed = document.createElement('p');
      myWindSpeed.className = "wind-speed";
      myWindSpeed.innerHTML = `Wind Speed: ${weatherResults.wind.speed}mph`;
     parentTag.appendChild(myWindSpeed);

}

// ask for a new zipcode 
const theModalBox = document.querySelector('aside');
const theSettings = document.querySelector('#settings');
theSettings.addEventListener('click', () => {
    theModalBox.classList.toggle('show');
});

// set the new zip 
const myButton = document.querySelector('#applyZip');
myButton.addEventListener('click', () => {
    console.log("you clicked me");

    theModalBox.classList.remove('show');
    const theZipCode = document.querySelector('#newZip').value;

    if (theZipCode.length === 5) {
        localStorage.setItem('myZipcode', theZipCode);

        // reload page so fetch runs again with new ZIP
        location.reload();
    }
});

// data validation for the zipcode 
const myInput = document.querySelector('#newZip');
myInput.addEventListener('input', () => {
    myInput.value = myInput.value.slice(0, 5);
});
