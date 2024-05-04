const userTab = document.querySelector("[data-userWeather]")
const searchTab = document.querySelector("[data-searchWeather]")

const userContainer = document.querySelector(".weather-container")
const grantAccessContainer = document.querySelector(".grant-location-container")
const searchhForm = document.querySelector("[data-searchForm]")

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
    }
}


userTab.addEventListener("click",()=>{
    switchTab(userTab);
})

searchTab.addEventListener("click",()=>{
    switchTab(searchTab);
})