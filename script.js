 document.querySelector('.busca').addEventListener('submit',async (event) => {
     event.preventDefault();

    let searchValue = document.querySelector('#searchInput').value.trim();

    console.log(searchValue)
    if(searchValue)
    {

        showWarning('Carregando...');

        let url =`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&APPID=1cad7115995f3b677da6f36af0fc9c5d&units=metric&lang=pt`;

        let results = await fetch(url);
        let json = await results.json();

        if(json.cod === 200){
            console.log(json);
            showInfo({
                city: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                temIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        }
        else{
            document.querySelector('.resultado').style.display ='none';
            showWarning('Não encontramos esta localização.');
        }

    }
 });

function showInfo(json){
    showWarning('');
    document.querySelector('.titulo').innerHTML =  `${json.city},${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>°C</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
    document.querySelector('.temp img').setAttribute('src',`http://openweathermap.org/img/wn/${json.temIcon}@2x.png`);
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;
    document.querySelector('.resultado').style.display ='block';

}

 function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg;
 }