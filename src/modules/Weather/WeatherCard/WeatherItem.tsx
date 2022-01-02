
import React from 'react';
import moment from 'moment';

import { IWeatherInfo } from '../../../interfaces';
import { WEATHER_STATE } from '../../../constants/weather-state';

const WeatherItem = ({ data: {
  applicable_date,
  min_temp,
  max_temp,
  weather_state_abbr,
  weather_state_name,
} }: { data: IWeatherInfo }) => (
  <>
    <div className="row row1">Min: {min_temp ? Math.round(min_temp): '...'} &deg;</div>
    <div className="row row1">Max: {max_temp ? Math.round(max_temp): '...'} &deg;</div>
    <div className="row row2">
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
    <div className="row row3">{moment(applicable_date).format('dddd')}</div>
  </>
);


export default WeatherItem;