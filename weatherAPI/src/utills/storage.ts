import { OpenWeatherTempScale } from "./api"

export interface LocalStorage{
    cities?: string[]
    options?: LocalStorageOptions
}

export interface LocalStorageOptions{
    tempScale: OpenWeatherTempScale
}

export type LocalStrageKeys = keyof LocalStorage

export function setStoragedCities(cities: string[]): Promise<void>{
    const vals: LocalStorage = {
        cities,
    }
    return new Promise((resolve, reject) => {
        chrome.storage.local.set(vals, () => {
            resolve()
        })
    })
}

export function getStoredCities(): Promise<string[]>{
    const keys: LocalStrageKeys[] = ["cities"]
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(keys,(res:LocalStorage) => {
            resolve(res.cities ?? [])
        })
    })
}

export function setStoredOptions(options: LocalStorageOptions):Promise<void>{
    const vals: LocalStorage = {
        options,
    }
    return new Promise((resolve, reject) => {
        chrome.storage.local.set(vals,()=>{
            resolve();
        })
    })
}

export function getStoredOptions(): Promise<LocalStorageOptions>{
    const keys: LocalStrageKeys[] = ["options"]
    return new Promise((resolve) => {
        chrome.storage.local.get(keys, (res: LocalStorage) => {
            resolve(res.options)
        })
    })
}