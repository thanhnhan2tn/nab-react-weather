import React, { Suspense, ReactNode, useCallback, useEffect } from 'react';
import { FC } from 'react';
import LocationSearch from './../../components/LocationSearch';
import moment from 'moment';
import Loader from './../../components/Loader';
import ErrorBoundary from './../../components/ErrorBoundary';
import './Weather.css';
import { Card } from 'react-bootstrap';
import WeatherItem from '../../components/WeatherCard/WeatherItem';
import WeatherCard from '../../components/WeatherCard';
import { useDispatch } from 'react-redux';
import { loadLocation } from './sagaActions';
import { selectWeather, selectDataState } from './weatherSlice';
import { DEFAULT_LOCATION } from './../../config';
import { useAppSelector } from './../../hooks';
import { IWeather, IWeatherInfo } from '../../interfaces';
import { ErrorMessage } from '../../constants';
import NoResult from './NoResult';

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