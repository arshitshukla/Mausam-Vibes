import React, { useState } from 'react';
import './CityInput.css';

const CityInput = ({ city, makeApiCall }) => {
  const [inputValue, setInputValue] = useState('');

  const onKeyPressHandler = async (e) => {
    const eventKey = e.which ? e.which : e.keyCode;
    const cityName = e.target.value;

    if (eventKey === 13) {
      if (/^[a-zA-ZäöüÄÖÜß ]+$/.test(cityName)) {
        e.target.classList.add('loading');
        if (await makeApiCall(cityName)) {
          e.target.placeholder = 'Enter a City...';
        } else {
          e.target.placeholder = 'City was not found, try again...';
        }
      } else {
        e.target.placeholder = 'Please enter a valid city name...';
      }
      e.target.classList.remove('loading');
      setInputValue('');
    }
  };

  const style = {
    top: city ? '-680px' : '',
  };

  return (
    <>
    <input
      className='city-input'
      style={style}
      type='text'
      placeholder='Enter a city to check its Mausam Vibes...'
      onKeyDown={onKeyPressHandler}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
    </>
  );
};

export default CityInput;
