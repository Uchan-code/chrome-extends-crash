import { getStoredCities,getStoredOptions,setStoragedCities,setStoredOptions } from "../utills/storage";
import { fetchOpenWeatherData } from "../utills/api";

chrome.runtime.onInstalled.addListener(() => {
  setStoragedCities([])
  setStoredOptions({
    hasAutoOverlay: false,
    homeCity: "",
    tempScale: "metric"
  })

  chrome.contextMenus.create({
    contexts: ["selection"],
    title: " Add city to weather extension ",
    id: "weatherExtension",
  })

  chrome.alarms.create({
      periodInMinutes: 60,
  })
})

chrome.alarms.onAlarm.addListener(() => {
  getStoredOptions().then((options) => {
    if(options.homeCity == ""){
      return 
    }
    fetchOpenWeatherData(options.homeCity,options.tempScale).then((data) => {
      const temp = Math.round(data.main.temp)
      const symbol = options.tempScale == "metric" ? "\u2103" : "\u2109"
      chrome.action.setBadgeText({
        text: `${temp}${symbol}`,
      })
    })
  })
})

chrome.contextMenus.onClicked.addListener((event) => {
  getStoredCities().then((cities) => {
    setStoragedCities([...cities, event.selectionText])
  })
})