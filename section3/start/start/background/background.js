chrome.runtime.onInstalled.addListener((details) => {
    chrome.storage.local.set({
        shows: [],
    })
    chrome.contextMenus.create({
        title: "Search TV Show",
        id: "contextMenu1",
        contexts: ["page", "selection"]
    });
    chrome.contextMenus.create({
        title: "Read This Show",
        id: "contextMenu2",
        contexts: ["page", "selection"]
    });
    chrome.contextMenus.onClicked.addListener((event) => {
        if (event.menuItemId == "contextMenu1") {
            fetch(`https://api.tvmaze.com/search/shows?q=${event.selectionText}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    chrome.storage.local.set({
                        shows: data,
                    })
                })

        } else if (event.menuItemId == "contextMenu2") {
            chrome.tts.speak(event.selectionText, {
                lang: "zh-CN",
                rate: 1,
            })
        }

        // chrome.search.query({
        //     disposition: "NEW_TAB",
        //     text: `imdb ${event.selectionText}`,
        // })
        // chrome.tabs.query({
        //     currentWindow: true,
        // }, (tabs) => {
        //     console.log(tabs)
        // })
        // chrome.tabs.create({
        //     active: true,
        //     url: `https://www.imdb.com/find/?q=${event.selectionText}&ref_=nv_sr_sm`
        // })
    });
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message)
    console.log(sender)
    sendResponse("recieved message from background")
    chrome.tabs.sendMessage(sender.tab.id, "Got your message from background")
})
