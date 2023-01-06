import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import { Card } from "@material-ui/core"
import WeatherCard from "../components/WeatherCard/WeatherCard"
import { getStoredOptions, LocalStorageOptions } from "../utills/storage"
import { Messages } from "../utills/messages"
import "./contentScript.css"

const App: React.FC<{}> = () => {
    const [options, setOptions] = useState<LocalStorageOptions | null>(null)
    const [isActive, setIsActive] = useState<boolean>(false);

    useEffect(() => {
        getStoredOptions().then((options) => {
            setOptions(options)
            setIsActive(options.hasAutoOverlay)
        })
    }, [])

    const handleMessages = (msg: Messages) => {
        if (msg === Messages.TOGGLE_OVERLAY) {
            setIsActive(!isActive)
        }
    }

    useEffect(() => {
        chrome.runtime.onMessage.addListener(handleMessages)
        return () => {
            chrome.runtime.onMessage.removeListener(handleMessages)
        }
    }, [isActive])

    if (!options) {
        return null
    }

    return (
        <>
            {
                isActive &&
                <Card className="overlayCard" >
                    <WeatherCard
                        city={options.homeCity}
                        tempScale={options.tempScale}
                        onDelete={() => setIsActive(false)} />
                </Card >
            }
        </>
    )
}

const root = document.createElement("div")
document.body.appendChild(root)
ReactDOM.render(<App />, root)
