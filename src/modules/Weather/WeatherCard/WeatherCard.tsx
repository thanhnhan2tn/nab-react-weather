
import React from 'react';
import { Card } from 'react-bootstrap';
import moment from 'moment';

import { WEATHER_STATE } from '../../../constants/weather-state';
import { IWeatherInfo } from '../../../interfaces';

import './WeatherCard.css';

interface IWeatherProps {
  weatherData: any
}

const WeatherCard: React.FC<IWeatherProps> = ({ weatherData: {
  time = '01-01-2020',
  title,
  the_temp,
  weather_state_abbr,
  weather_state_name
} }: { weatherData: IWeatherInfo }) => {
  return (
    <Card className="card-today">
      <div className="row">
        <div className="col-6">
          <div className="date">Date: {moment(new Date(time)).format('DD/MM/YYYY')}</div>
          <div className="temp">{the_temp ? Math.round(the_temp): '...'} &deg;</div>
          <div className="location">{title}</div>
        </div>
        <div className="col-6 justify-content-right">
          {
            weather_state_abbr ?
              <img
                className="img-fluid"
                alt={weather_state_name}
                src={WEATHER_STATE[weather_state_abbr]}
              />
              : null
          }
        </div>
      </div>
    </Card>
  )
};


export default WeatherCard;