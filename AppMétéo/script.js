const loader = document.querySelector(".loader-container");
const errorInformation = document.querySelector(".error-information");

async function getWeatherData(){
    try {
        //console.log(`ligne 09`);
        const response = await fetch(`http://api.airvisual.com/v2/nearest_city?key=4e111a11-5eae-471b-8a9f-64d5dec942bb`).catch(error => {
            throw new Error("Problème de connexion internet")
        });


        if (!response.ok) {
            throw new Error(`Error ${response.status} ${response.statusText}`)
        }
        const responseData = await response.json()
        const sortedData = {
            city: responseData.data.city,
            country: responseData.data.country,
            iconId: responseData.data.current.weather.ic,
            temperature: responseData.data.current.weather.tp,
        }
        console.log(`objet `, sortedData);
        populateUi(sortedData);
    }catch (error) {
        loader.classList.remove("active");
        errorInformation.textContent = error.message
    }
}
getWeatherData();

const cityName = document.querySelector(".city-name");
const countryName = document.querySelector(".country-name");
const temperature = document.querySelector(".temperature");
const infoIcon = document.querySelector(".info-icon");

function populateUi(data){
    cityName.textContent = data.city;
    countryName.textContent = data.country;
    temperature.textContent = `${data.temperature}°`;
    infoIcon.src = `ressources/icons/${data.iconId}.svg`
    infoIcon.style.width = "150px";
    loader.classList.remove("active");
}