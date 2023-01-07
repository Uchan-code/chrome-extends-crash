// TODO: background script
// chrome.runtime.onInstalled.addListener(() => {
//   // TODO: on installed function
// })

chrome.webRequest.onBeforeRequest.addListener((details) => {
  console.log(details)
  return {
    cancel: true,
  }
},{
  urls: [`*;//*.googleadservices.com/*`],
},["blocking"])