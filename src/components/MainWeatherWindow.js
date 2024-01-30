import React from 'react';
import './MainWeatherWindow.css';

const MainWeatherWindow = ({ city, data, children, isCelsius, onToggleTemperature,onClearCity }) => {
  const title = !city && <h1 className='title'>Mausam<span className='yellow'>Vibes</span></h1>
  const showContent = city && data;

  const clearCity = () => {
    onClearCity();
  };

  return (
    <div className='main'>
      <div className='inner-main'>
        {title}
        {showContent && (
          <>
          <div className='btn'>
              <button onClick={clearCity}>
                Check another City
              </button>
              <button onClick={onToggleTemperature}>
                {isCelsius ? "Convert to Farhenhite" :"Convert to Celcius"}
              </button>
      </div>
            <img
              src={require(`../images/${data.icon}.svg`)}
              alt='sun'
            />

            <div className='today'>
              <span>Today</span>
              <h1>{city}</h1>
              <p>
              Current Temperature: <b>{isCelsius ? Math.round(data.temp - 273.15) + '°C' : Math.round(data.temp * (9/5) - 459.67) + '°F'}</b>
              </p>
              <p>
                Min Temperature: <b>{isCelsius ? Math.round(data.mintemp - 273.15) + '°C' : Math.round(data.mintemp * (9/5) - 459.67) + '°F'}</b>
              </p>
              <p>
                Max Temperature: <b>{isCelsius ? Math.round(data.maxtemp - 273.15) + '°C' : Math.round(data.maxtemp * (9/5) - 459.67) + '°F'}</b>
              </p>
              <p>
                Humidity : {data.humidity}
              </p>
              <p>
                Wind Speed : {data.wind} Km/Hours
              </p>
              <strong><p>{data.weather_desc.toLowerCase()}</p></strong>
            </div>
          </>
        )}
      </div>
      {children}
    </div>
  );
};

export default MainWeatherWindow;
