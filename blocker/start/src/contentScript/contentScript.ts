const rules: {
    [url: string]: () => void
} = {
    "https://www.nytimes.com/**": // https://www.nytimes.com/section/business
    filterNYT2,
}

function filterNYTTechnology(){
    return
    const app = document.getElementById("app")
    const wrapper = document.getElementById("dfp-ad-top")
    app.removeChild(wrapper)
}

function filterNYT2(){
    const divs = document.getElementsByTagName("div")
    for(const div of divs){
        if(div.className.indexOf("ad") != -1){
            div.style.display = "none"
        }
    }
}

if(document.URL in rules){
    console.log(document.URL)
    rules[document.URL]()
}