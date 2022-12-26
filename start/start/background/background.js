chrome.alarms.create("pomodoroTimer", {
    periodMinutes: 1 / 60,
})

chrome.alarms.onAlarm.addEventlistener((alarm) => {
    if (alarm.name === "pomodoroTimer") {

    }
})

chrome.storage.local.get([

])