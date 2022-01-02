import React, { FC, Suspense, ReactNode, useCallback, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import LocationSearch from './LocationSearch';
import Loader from './../../components/Loader';
import ErrorBoundary from './../../components/ErrorBoundary';
import WeatherItem from './WeatherCard/WeatherItem';
import WeatherCard from './WeatherCard';
import { loadLocation } from './sagaActions';
import { selectWeather, selectDataState } from './weatherSlice';
import { DEFAULT_LOCATION } from './../../config';
import { useAppSelector } from './../../hooks';
import { IWeather, IWeatherInfo } from '../../interfaces';
import { ErrorMessage } from '../../constants';
import NoResult from './NoResult';

import './Weather.css';

interface IProps {
  loading?: boolean,
  error?: string,
}

const Weather: FC = () => {
  const dispatch = useDispatch();

  const renderItems = (weathers: IWeatherInfo[]) => (
    weathers.map((forecast) => {
      return (
        <div className="col" key={forecast.id}>
          <WeatherItem data={forecast} />
        </div>
      );
    })
  )

  const { consolidated_weather = [], time, title} = useAppSelector(selectWeather) as IWeather;
  const { error, loading } = useAppSelector(selectDataState) as IProps;

  const [currentWeahter, ...weathers] = consolidated_weather;
  
  useEffect(() => {
    dispatch(loadLocation(DEFAULT_LOCATION));
  }, []);

  const onSearchLocation = useCallback((value) => {
    dispatch(loadLocation(value));
  }, [loadLocation]);
  console
  return (
    <div className="app container">
      <ErrorBoundary>
        <Suspense fallback={Loader}>
          <div className="card content">
            <LocationSearch onSearch={onSearchLocation} defaultValue={DEFAULT_LOCATION} loading={loading} />
            <div className="content__body">
              {
                error === ErrorMessage.NoResult ? <NoResult /> : ''
              }
            </div>
          </div>
          <WeatherCard weatherData={{...currentWeahter, time, title}} />
          <Card className="focast-list">
            <div className="row">
              {
                renderItems(weathers)
              }
            </div>
          </Card>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default Weather;