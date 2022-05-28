const APP_ID = '870fee7417c710ef607651ec62bc6c83';
const searchInput =$('#search-city-input')
const DEFAULT_VALUE ='--';
const cityName = $('.city-name')
const valueTemperature =$('.value-tempera')
const weatherState = $('.wather-state')
const watherIcon = $('.wather-icon')
const wind =  $('.wind')
const humidity = $('.humidity')
const sunrise = $('.sunrise')
const sunset = $('.sunset')
const timeNow =$('.value-time')
const pathImg ='./img/'
searchInput.addEventListener('change',(e) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=${APP_ID}&units=metric&&lang=vi&cnt=3`)
    .then(async res => {
        const data =await res.json();
        cityName.innerHTML =data.name || DEFAULT_VALUE;
        valueTemperature.innerHTML =data.main.temp +'°' ||DEFAULT_VALUE;
        weatherState.innerHTML =data.weather[0].description  ||DEFAULT_VALUE;
        watherIcon.style.src =`http://openweathermap.org/img/wn/${data.weather[0].id}.png"` ||DEFAULT_VALUE;
        wind.innerHTML =`Tốc độ gió: ${(data.wind.speed * 3.6).toFixed(2)} km/h`||DEFAULT_VALUE;
        humidity.innerHTML =`Độ ẩm: ${data.main.humidity} %`||DEFAULT_VALUE;
        sunset.innerHTML = moment.unix(data.sys.sunset).format('H:mm') || DEFAULT_VALUE;
        sunrise.innerHTML = moment.unix(data.sys.sunrise).format('H:mm') || DEFAULT_VALUE;
        timeNow.innerHTML = moment.unix(data.dt).format('H:mm:ss') || DEFAULT_VALUE;
        if(data.weather[0].description ==="mây đen u ám"){
            $('#content').style.backgroundImage = `url(${pathImg}u_am.jpeg)`;
        }
        else if(data.weather[0].description ==="nắng nhẹ"){
            $('#content').style.backgroundImage = `url(${pathImg}troi-trong.jpeg)`;
        }
        else {
            $('#content').style.backgroundImage = `url(${pathImg}sky.jpg)`;
        }
    })
    .catch(function(error) {
       return;
      });
})
