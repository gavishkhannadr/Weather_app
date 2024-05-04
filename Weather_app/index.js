const userTab = document.querySelector("[data-userWeather]")
const searchTab = document.querySelector("[data-searchWeather]")

const userContainer = document.querySelector(".weather-container")
const grantAccessContainer = document.querySelector(".grant-location-container")
const searchForm = document.querySelector("[data-searchForm]")

const loadingScreen = document.querySelector(".loading-container")
const userInfoContainer = document.querySelector(".user-info-container")


let currentTab = userTab;
const API_KEY = "0dbe94e4254d1256cfcd0cce50795008";
currentTab.classList.add("current-tab"); 

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
    const localCoordinates = sessionStorage.get("user-coordinates");
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
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_key}`)
    }
    catch(err){

    }
}