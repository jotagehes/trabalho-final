function getForecast() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      requestWeatherData(latitude, longitude);
    });
  } else {
    alert("Geolocalização não é suportada por este navegador.");
  }
}

function requestWeatherData(latitude, longitude) {
  const apiKey = 'aec832bb9d8c430f9b1130817231810';
  const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=4`;

  const xhr = new XMLHttpRequest();

  xhr.open('GET', apiUrl, true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log(xhr.responseText);
      const data = JSON.parse(xhr.responseText);
      const forecastData = data.forecast.forecastday;
      console.log(data);
      const weatherInfo = document.getElementById('weather');
      const currentWeather = document.getElementById('currentWeather');

      currentWeather.innerHTML = `<div class="currentTem">
      
        <strong>Condição atual: </strong>${data.current.temp_c} ºC<br>
        <strong>Sensação Térmica: </strong>${data.current.feelslike_c} ºC<br>
        <strong>Umidade do Ar: </strong>${data.current.humidity}%<br>
        <strong>Condição Atmosférica: </strong>${data.current.condition.text}<br>
      
      </div>
      `;
      weatherInfo.innerHTML = `<strong>Previsão para os próximos 3 dias:</strong><br>`;
      currentWeather.classList.add('myCard')
      weatherInfo.classList.add('myCard')

      document.getElementById("location").innerText = `Localização: ${data.location.name}`;
      document.getElementById("location").classList.add('locationClass');
      document.getElementById("icon").classList.add('currentTemperature');
      document.getElementById("icon").style.backgroundImage = `url(${data.current.condition.icon})`;
      forecastData.forEach((day, index) => {
        if (index === 0) {
          return;
        }
        weatherInfo.innerHTML += `<strong>${getWeekDay(day.date)}:</strong> Temp. máxima: ${day.day.maxtemp_c}°C, Temp. mínima: ${day.day.mintemp_c}°C<br>`;
      });
    } else {
      console.error('Erro ao obter os dados da previsão do tempo. Código de status:', xhr.status);
    }
  };

  xhr.onerror = function () {
    console.error('Erro ao fazer a requisição.');
  };

  xhr.send();
}

function getWeekDay(data) {
  const weekDay = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  const numberWeekDay = (new Date(data)).getDay();

  return weekDay[(numberWeekDay + 1) % 7];
}
