import React, { useEffect, useState } from 'react';
import './weather-card.component.scss';
import axios from 'axios';
import { getDayFromSeconds, getFullDate } from 'utils/functions/date.functions';

const WeatherCardComponent: React.FC = () => {

  const [forecast, setForecast] = useState<any>();
  const [forecastList, setForecastList] = useState<any[]>([]);
  const [forecastToday, setForecastToday] = useState<any>();

  const getWeather = async (lat: number, lon: number) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_APIKEY}&exclude=minutely, hourly, alerts&units=metric&lang=pt_br`);
      const mappedForecast = response.data.daily.map((forecast: any, index: number) => {
        return {
          name: getDayFromSeconds(forecast.dt),
          icon: `http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`,
          weatherName: forecast.weather[0].main,
          temp: parseInt(forecast.temp.max)
        };
      });
      mappedForecast.pop();
      setForecast(response.data);
      setForecastToday(response.data.current);
      setForecastList(mappedForecast);
    } catch (error) {
      throw new Error("Erro ao conectar a Weather-API");
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
    });
  }, []);

  return (
    <>
      {
        forecast ? (
          <div className='weather-card'>
            <div className='forecast-header'>
              <h6>
                {parseInt(forecastToday?.temp)}º <br />
              </h6>
              <p>{forecast?.timezone}</p>
              <p className='fulldate'>{getFullDate()}</p>
            </div>
            <div className='forecast-wrapper'>
              {
                forecastList.map((forecastData: any) => (
                  <div key={forecastData.name} className='forecast'>
                    <p className='forecast-day'>{forecastData.name}</p>
                    <img src={forecastData.icon} alt={forecastData.weatherName} />
                    <p>{forecastData.temp}º</p>
                  </div>
                ))
              }
            </div>
          </div>
        ) : ''
      }
    </>
  );


};

export default WeatherCardComponent;
