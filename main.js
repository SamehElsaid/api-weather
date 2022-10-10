let section = document.querySelector(".all")
let loadingBox = document.querySelector(".loading")
let pos = (posation) => {
    let lat = posation.coords.latitude
    let lon = posation.coords.longitude
    let apiKey = "594831ab1a8a92add8eb5f0db6be440f"
    loading(true)
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${apiKey}`)
        .then(res => res.json())
        .then((data) => getData(data))
        .catch(erro => getErro(erro))
}
let erro = (err) => {
    section.innerHTML = `
        <h1 style="text-align:center;color: #f44336;">Please Allow Location to Know Weather</h1>
    `
}
function getData(e) {
    let windSpeed = "N " + e.wind.speed + " km/h"
    let description = e.weather[0].description
    let weather = e.weather[0].main
    let ContrayName = e.name
    let max = Math.ceil(e.main.temp_max - 273) + '°'
    let min = Math.floor(e.main.temp_min - 273) + '°'
    let humidity = e.main.humidity + "%"
    let pressure = e.main.pressure
    loading(false)
    section.innerHTML = `
        <div class="img">
        <img src="img/pngwing.com.png" alt="">
        </div>
        <div class="parent">
        <div class="">
            <p><span class="city" style="font-size: 20px;">Contrary: </span></br> ${ContrayName}</p>
            <p><span class="max">Max </span>:${max}</p>
            <p><span class="min">Min </span>:${min}</p>
            <p>${description}</p>
        </div>
        <div class="">
            <p><span>Air Quality </span>: ${weather}</p>
            <p><span>Wind </span>: ${windSpeed}</p>
            <p><span>Pressure </span>: ${pressure}</p>
            <p><span>Humidity </span>: ${humidity}</p>
        </div>
        </div>
        `
}
function getErro() {
    section.innerHTML = `
        <h1 style="text-align:center;color: #f44336;">Please Check Your InterNet</h1>
    `
}
function loading(sta) {
    if (sta) {
        console.log();
        loadingBox.style.display = "block"
        section.style.display = "none"
    } else {
        loadingBox.style.display = "none"
        section.style.display = "block"
    }
}
navigator.geolocation.getCurrentPosition(pos, erro)
