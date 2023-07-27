console.log("connected")

// let weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?q=skopje&units=metric&APPID=2095b65c75e8d13fe9e3b0e095b36936"

/**
 * 1. Create an HTML file;
 * 2. Create a JS file;
 * 3. Connect the JS file with the HTML file and test it =);
 * 4. Create simple input text and button in the HTML;
 * 5. Select those elements;
 * 6. Create a function that makes API request to the corresponding URL 
 * 7. Analyze the response, think about what you may use or what needs to be generated;
 * 8. Create a function that will get the necessary information (object properties) and display it in the HTML (for each info you need dot notation from the response)
 * 9. I will create smaller functions to display the maximum, average and minimum temperatures as well as their humidities
 * FEEL FREE TO ADD MORE STEPS;
 * NOTE: Feel free to use BOOTSTRAP =)
*/


let userInput = document.getElementById("userInput");
let main = document.querySelector("main")
let searchButton = document.getElementById("searchButton");
let homeButton = document.getElementById("homeButton");
let hourlyButton = document.getElementById("hourlyButton");
let cityName = document.getElementById("cityName");
let cityStatus = document.getElementById("cityStatus");
let clouds = document.getElementById("clouds");
let tempStatus = document.getElementById("tempStatus");
let timePeriod = document.getElementById("timePeriod");
let hourlyData = document.getElementById("hourlyData");
let firstHeader = document.getElementById("firstHeader")



let searchedPressed = false;


function getWeatherInfo(city){
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=ef8b0df6236719c430c3cda6e34ef111`)
    .then((response) => {
      console.log(response);
      return response.json()
    })
    .then((data) => {
      console.log(data)
      currentInfoCity(data);
      hourlyDataInfo(data)
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      console.log("Finally")
    })
}



// "Bug" => Whenever I don't have anything inside the input and click on the Search button, the Weather forecast from below gets displayed.
// FIX IT WHEN YOU OPEN YOUR CODE
searchButton.addEventListener("click", () => {
  if(userInput.value === "") return

  hourlyData.innerHTML = "";

  getWeatherInfo(userInput.value)

  searchedPressed = true;
})

homeButton.addEventListener("click", () => {
  if(!searchedPressed) return
  switchState()
})

hourlyButton.addEventListener("click", () => {
  if(!searchedPressed) return
  switchStateTwo()
})


function switchState(){
  main.style.display = "flex"
  hourlyData.style.display = "none"
}


function switchStateTwo(){
  hourlyData.style.display = "block"
  main.style.display = "none"
}



// getWeatherInfo("Skopje")

function currentInfoCity(info){
  firstHeader.innerHTML = `Weather forecast`;
  cityName.innerHTML = `City Name: ${info.city.name}`;
  cityStatus.innerHTML = `Current temp: ${info.list[0].main.temp} Feels like: ${info.list[0].main.feels_like}`;
  clouds.innerHTML = `${info.list[0].weather[0].description}: <img src="http://openweathermap.org/img/w/${info.list[0].weather[0].icon}.png"></img>`;

  tempStatus.innerHTML = `<div>Highest temp: ${maxTempInfo(info.list)} &deg;C</br>
  Avg temp: ${averageTempInfo(info.list)} &deg;C</br>
  Min temp: ${minTempInfo(info.list)} &deg;C</div> 
  <div>Highest humidity: ${maxHumInfo(info.list)} %</br>
  Avg humidity: ${averageHumInfo(info.list)} % </br>
  Min humidity: ${minHumInfo(info.list)} % </div>`;

  timePeriod.innerHTML = `Warmest time of the period: ${warmestTime(info.list)}<br/>
  Coldest time of the period: ${coldestTime(info.list)}`

  switchState()
}


function maxTempInfo(arrayOfMaxTemps){

  let maxTemp = arrayOfMaxTemps[0].main.temp_max;

  for(let i = 0; i < arrayOfMaxTemps.length; i++){

    if (arrayOfMaxTemps[i].main.temp_max > maxTemp) {
      maxTemp = arrayOfMaxTemps[i].main.temp_max
    }
  }
  console.log(maxTemp);
  return maxTemp;
}


function averageTempInfo(arrayOfAvgTemps){

  let averageTemp = 0;

  for(let i = 0; i < arrayOfAvgTemps.length; i++) {
    averageTemp += arrayOfAvgTemps[i].main.temp
  }

  averageTemp = averageTemp / arrayOfAvgTemps.length
  console.log(averageTemp);
  return averageTemp.toFixed(2);
}


function minTempInfo(arrayOfMinTemps){

  let minTemp = arrayOfMinTemps[0].main.temp_min;

  for(let i = 0; i < arrayOfMinTemps.length; i++){

    if(arrayOfMinTemps[i].main.temp_min < minTemp){
      minTemp = arrayOfMinTemps[i].main.temp_min
    }
  }

  console.log(minTemp);
  return minTemp;
}


function maxHumInfo(arrayOfMaxHum){

  let maxHum = arrayOfMaxHum[0].main.humidity;

  for(let i = 0; i < arrayOfMaxHum.length; i++){

    if(arrayOfMaxHum[i].main.humidity > maxHum){
      maxHum = arrayOfMaxHum[i].main.humidity
    }
  }

  console.log(maxHum);
  return maxHum;
}


function averageHumInfo(arrayOfAvgHum){

  let averageHum = 0

  for(let i = 0; i < arrayOfAvgHum.length; i++){
    averageHum += arrayOfAvgHum[i].main.humidity
  }

  averageHum = averageHum / arrayOfAvgHum.length
  console.log(averageHum);
  return averageHum.toFixed(2);
}


function minHumInfo(arrayOfMinHum){

  let minHum = arrayOfMinHum[0].main.humidity

  for(let i = 0; i < arrayOfMinHum.length; i++){

    if(arrayOfMinHum[i].main.humidity < minHum){
      minHum = arrayOfMinHum[i].main.humidity
    }
  }

  console.log(minHum);
  return minHum;
}


function warmestTime(warmestInfo){

  let warmestPeriod = warmestInfo[0].dt_txt

  for(let i = 0; i < warmestInfo.length; i++){

    if(warmestInfo[i].dt_txt > warmestPeriod){
      warmestPeriod = warmestInfo[i].dt_txt
    }
  }

  console.log(warmestPeriod);
  return warmestPeriod
}


function coldestTime(coldestInfo){

  let coldestPeriod = coldestInfo[0].dt_txt

  for(let i = 0; i < coldestInfo.length; i++){

    if(coldestInfo[i].dt_txt < coldestPeriod){
      coldestPeriod = coldestInfo[i].dt_txt
    }
  }

  console.log(coldestPeriod);
  return coldestPeriod
}

// style="color: blue" 
function hourlyDataInfo(tableInfo){
  hourlyData.innerHTML +=` <h1> Hourly data </h1>
  <tr>    
  <td> Icon </td>
  <td> Description </td>
  <td> Date </td>
  <td> Temperature </td>
  <td> Humidity </td>
  <td> Wind Speed </td> 
  </tr>
  `
  for(let i = 0; i < tableInfo.list.length; i++){
    let tr = document.createElement("tr");
    tr.innerHTML = `<td> <img src="http://openweathermap.org/img/w/${tableInfo.list[i].weather[0].icon}.png"> </td>
    <td> ${tableInfo.list[i].weather[0].description} </td>
    <td> ${tableInfo.list[i].dt_txt} </td> 
    <td> ${tableInfo.list[i].main.temp} &deg;C </td> 
    <td> ${tableInfo.list[i].main.humidity} % </td>
    <td> ${tableInfo.list[i].wind.speed} km/h </td>`
    hourlyData.appendChild(tr);
  }
}