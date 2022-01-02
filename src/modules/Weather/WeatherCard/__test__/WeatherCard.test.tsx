import React from 'react';
import { shallow } from 'enzyme';
import WeatherCard from '..';
import { IWeatherInfo } from '../../../../interfaces';

describe('WeatherCard', () => {
  let props: { weatherData: IWeatherInfo };
  beforeEach(() => {
    props = {
      weatherData: {
        id: 1,
        time: '2022-01-01T07:16:41.376284Z"',
        title: 'Ho Chi Minh',
        the_temp: 31,
        weather_state_abbr: 'hr',
        weather_state_name: 'Heavy Rain'
      }
    };
  });
  it('should render to match snapshot', () => {
    const component = shallow(<WeatherCard  {...props} />);
    expect(component).toMatchSnapshot();
  })
})