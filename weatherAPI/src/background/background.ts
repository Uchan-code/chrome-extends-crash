import { setStoragedCities,setStoredOptions } from "../utills/storage";

chrome.runtime.onInstalled.addListener(() => {
  setStoragedCities([])
  setStoredOptions({
    homeCity: "",
    tempScale: "metric"
  })
})
