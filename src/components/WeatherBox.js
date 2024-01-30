// WeatherBox.js
import React from 'react';
import './WeatherBox.css';

const WeatherBox = ({ date, icon, temp, isCelsius,weather_desc }) => {

  const showContent = date;

  const getDate = (date) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const [fullDate, time] = date.split(' ');
  const [year, month, day] = fullDate.split('-');
  const formattedDate = new Date(`${year}-${month}-${day}`).toLocaleDateString('en-GB', options);
  return formattedDate;
  };

  const convertTemperature = (temp) => {
    return isCelsius ? Math.round(temp - 273.15) + '°C' : Math.round(temp * (9/5) - 459.67) + '°F';
  };

  return (
    <>
      {showContent && (
        <div className='weather-box'>
          <h1>{getDate(date)}</h1>
          <h1>{weather_desc}</h1>
          <img
            src={icon ? require(`../images/${icon}.svg`) : require('../images/01d.svg')}
            alt='sun'
          />
          <span className='temp'>{convertTemperature(temp)}</span>
        </div>
      )}
    </>
  );
};

export default WeatherBox;
