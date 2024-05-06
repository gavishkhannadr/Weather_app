const userTab = document.querySelector("[data-userWeather]")
const searchTab = document.querySelector("[data-searchWeather]")

const userContainer = document.querySelector(".weather-container")
const grantAccessContainer = document.querySelector(".grant-location-container")
const searchForm = document.querySelector("[data-searchForm]")

const loadingScreen = document.querySelector(".loading-container")
const userInfoContainer = document.querySelector(".user-info-container")


let currentTab = userTab;
const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
currentTab.classList.add("current-tab"); 

getfromSessionStorage();

// EventListner 
function switchTab(clickedTab){
    if(currentTab != clickedTab){
        currentTab.classList.remove("current-tab");
        clickedTab.classList.add("current-tab");
        currentTab = clickedTab;

        if(!searchForm.classList.contains("active")){
            userInfoContainer.classList.remove("active");
            searchForm.classList.add("active");
            grantAccessContainer.classList.remove("active");

        }
        else{
            userInfoContainer.classList.remove("active");
            searchForm.classList.remove("active");

            getfromSessionStorage();
        }
    }
}


userTab.addEventListener("click",()=>{
    switchTab(userTab);
})

searchTab.addEventListener("click",()=>{
    switchTab(searchTab);
})

function getfromSessionStorage(){
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if(!localCoordinates){
        grantAccessContainer.classList.add("active");
    }
    else{
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeather(coordinates);
    }
}


async function fetchUserWeather(coordinates){
    const {lat,lon} = coordinates;
    grantAccessContainer.classList.remove("active");
    loadingScreen.classList.add("active");


    //API Call
    try{
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data = await res.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active"); 
        renderWeatherInfo(data);
    }
    catch(err){
        //hw 
        // remove loading screen
    }
}


function renderWeatherInfo(data){
    const cityName = document.querySelector("[data-cityName]");
    const CountryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const windSpeed = document.querySelector("[data-windSpeed]");
    const humidity = document.querySelector("[data-humidity]")  ;
    const  cloudiness =  document.querySelector("[data-cloudiness]")

    // fetch values from Json object
    cityName.innerText = data?.name;
    console.log(data?.name);
    CountryIcon.src = `https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`;
    desc.innerText = data?.weather[0]?.description;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data?.weather[0]?.icon}.png`;
    temp.innerText = `${data?.main?.temp} °C`;
    windSpeed.innerText = `${data?.wind?.speed} m/s`;
    humidity.innerText = `${data?.main?.humidity} %`;
    cloudiness.innerText = `${data?.clouds?.all} %`;
}

function getLoaction(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        // show an alert for no geoLoaction support available
    }
}

function showPosition(position){
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }

    sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinates));
    fetchUserWeather(userCoordinates);
}


const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click",getLoaction);

const searchInput = document.querySelector("[data-searchInput]");
searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    if(searchInput.value === "") 
        return ;
    
    else
        fetchSearchWeatherInfo(searchInput.value);

});

async function fetchSearchWeatherInfo(city){
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err){
        // show an alert for no geoLoaction support available
    }
} 