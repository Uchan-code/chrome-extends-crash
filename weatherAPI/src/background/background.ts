import { setStoragedCities,setStoredOptions } from "../utills/storage";

chrome.runtime.onInstalled.addListener(() => {
  setStoragedCities([])
  setStoredOptions({
    hasAutoOverlay: false,
    homeCity: "",
    tempScale: "metric"
  })
})
