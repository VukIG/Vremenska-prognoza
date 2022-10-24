const nameOfCity=document.querySelector('.name');
const temp=document.querySelector('.temperature');
const search=document.querySelector('.search');
const isocode=document.querySelector('#countrycode')
const input=document.querySelector('#nameofcity');
const min=document.querySelector('.min');
const max=document.querySelector('.max');
const weatherDesc=document.querySelector('.weatherimg');
const seven=document.querySelector('.sevendays');
const thirty=document.querySelector('.thirtyday');
const future=document.querySelector('.forbiddenpre');

let lat;
let lon;
let ukey='65c037a7b2d9d4e1b8b133f4173952d7';
let list=[];
let dani=[];

function sortstuff() {
    for (let i = 0; i < list.length; i++) {
        let dan=document.createElement('div');
        dan.classList.add('.dan');
        dan.innerHTML=`
            <h1>Day ${i}</h1>
            <button> temperature by hours </button>
            <div class="rock-it">
                
            </div>
        `
        future.append(dan);
        for (let j = 0; j < 8; j++) {
            let sat=i*8+j;
            let polje=document.createElement('p');
            polje.innerHTML='Temperature at ' +j + 'h is' + list.sat.temp;
            dan.appendChild(polje);
        }
    }
}

function saljiponovo() {
    fetch('https://api.openweathermap.org/data/2.5/forecast?lat='+ lat +'&lon=' + lon +'&appid=' + ukey)
    .then(response=> response.json())
    .then(data=>{
        console.log(data);
        list=data.list;
        sortstuff();
    })
}

function unitConversion(temp){
    let temperaturaufa=temp-273.15;
    let ajojvise=temperaturaufa*1.8 + 32
    return ajojvise;
}

function ussrsrbija() {
    fetch('https://api.openweathermap.org/data/2.5/weather?lat='+ lat +'&lon=' + lon +'&appid=' + ukey)
    .then(response => response.json())
    .then(data => {
        if(data.name=!"" && data.name!= "true" ){
            console.log(data);
            temp.innerHTML=Math.round(unitConversion(data.main.temp)) + '°F';
            min.innerHTML+= Math.round(unitConversion(data.main.temp_min)) + '°F';
            max.innerHTML+= Math.round(unitConversion(data.main.temp_max)) + '°F';
            weatherDesc.innerHTML=data.weather[0].description;
            seven.addEventListener("click",function () {
                saljiponovo();
            });
        }
    });
}

function fetchapi(city,isocod) {
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
    if(city!='' && isocod!=''){
        fetchapi(city,isocod);
        nameOfCity.innerHTML=city;
        min.innerHTML= 'Min temperature:';
        max.innerHTML= 'Max temperature:';
    }
});