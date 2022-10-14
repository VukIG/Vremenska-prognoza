const nameOfCity=document.querySelector('.name');
const temp=document.querySelector('.temperature');
const search=document.querySelector('.search');
const isocode=document.querySelector('#countrycode')
const input=document.querySelector('#nameofcity');


let lat;
let lon;
let ukey='65c037a7b2d9d4e1b8b133f4173952d7'

function ussrsrbija(lat,lon) {
    fetch('https://api.openweathermap.org/data/2.5/weather?lat='+ lat +'&lon=' + lon +'&appid=' + ukey)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let temperatura=data.main.temp;
        let temperaturaufa=temperatura-273.15;
        let ajojvise=temperaturaufa*1.8 + 32
        temp.innerHTML=Math.floor(ajojvise);
    });
}


function fetchapi(city,isocod) {
    let datverda;
    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + city +', ,'+ + ',' + isocod + '&appid=' + ukey)
    .then(response => response.json())
    .then( data => {
        lat=data[0].lat
        lon=data[0].lon
        ussrsrbija(lat,lon);
        console.log(data)
    });
    
}

search.addEventListener("click",function () {
    let city=input.value;
    let isocod=isocode.value;
    nameOfCity.innerHTML=city;

    fetchapi(city,isocod);
    console.log('http://api.openweathermap.org/geo/1.0/direct?q=' + city +','+ isocode + '&appid=' + ukey)
});