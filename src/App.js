import React, { useEffect, useState} from 'react';
import './App.css';
import MainWeatherWindow from './components/MainWeatherWindow';
import CityInput from './components/CityInput';
import WeatherBox from './components/WeatherBox';

const App = () => {

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);   
  
  const [city, setCity] = useState(undefined);
  const [days, setDays] = useState(new Array(5).fill(null));
  const [isCelsius, setIsCelsius] = useState(true);

  const clearCity = () => {
    setCity(undefined);
    setDays(new Array(5).fill(null));
  };

  const getDayIndices = (data) => {
    let dayIndices = [0];

    let index = 0;
    let tmp = data.list[index].dt_txt.slice(8, 10);

    for (let i = 0; i < 4; i++) {
      while (
        tmp === data.list[index].dt_txt.slice(8, 10) ||
        data.list[index].dt_txt.slice(11, 13) !== '15'
      ) {
        index++;
      }
      dayIndices.push(index);
      tmp = data.list[index].dt_txt.slice(8, 10);
    }
    return dayIndices;
  };

  const updateState = (data) => {
    const city = data.city.name;
    const dayIndices = getDayIndices(data);

    const newDays = Array.from({ length: 5 }, (_, i) => ({
      date: data.list[dayIndices[i]].dt_txt,
      weather_desc: data.list[dayIndices[i]].weather[0].description,
      icon: data.list[dayIndices[i]].weather[0].icon,
      temp: data.list[dayIndices[i]].main.temp,
      mintemp: data.list[dayIndices[i]].main.temp_min,
      maxtemp: data.list[dayIndices[i]].main.temp_max,
      humidity: data.list[dayIndices[i]].main.humidity,
      wind: data.list[dayIndices[i]].wind.speed,
    }));

    setCity(city);
    setDays(newDays);
  };

  const makeApiCall = async (city) => {
    try {
      const api_data = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=4d4e48300f524ab68e0cc0c6f64e5167`
      ).then((resp) => resp.json());

      if (api_data.cod === '200') {
        updateState(api_data);
        return true;
      } else return false;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return false;
    }
  };

  const WeatherBoxes = () => {
    const weatherBoxes = days.slice(1).map((day, index) => (
      <li key={index}>
         {day && day.weather_desc !== null && (
        <WeatherBox {...day} isCelsius={isCelsius} weather_desc={day.weather_desc} />
      )}
      </li>
    ));

    return <ul className='weather-box-list'>{weatherBoxes}</ul>;
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <MainWeatherWindow data={days[0]} onClearCity={clearCity} city={city} isCelsius={isCelsius} onToggleTemperature={() => setIsCelsius((prev) => !prev)}>
          <CityInput city={city} makeApiCall={makeApiCall}  />
          <WeatherBoxes />
        </MainWeatherWindow>
      </header>
    </div>
  );
};

export default App;
