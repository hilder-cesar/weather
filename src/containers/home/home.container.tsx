import React from 'react';
import WeatherCardComponent from 'components/weather-card/weather-card.component';
import './home.container.scss';

const HomeContainer: React.FC = () => {
  return (
    <div className='app-container'>
      <WeatherCardComponent />
    </div>
  );
};

export default HomeContainer;
