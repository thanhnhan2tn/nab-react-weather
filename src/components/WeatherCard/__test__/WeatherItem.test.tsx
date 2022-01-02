import React from 'react';
import { shallow } from 'enzyme';
import WeatherItem from '../WeatherItem';
import { IWeatherInfo } from '../../../interfaces';

describe('WeatherItem', () => {
  let props: { data: IWeatherInfo };
  beforeEach(() => {
    props = {
      data: {
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
    const component = shallow(<WeatherItem  {...props} />);
    expect(component).toMatchSnapshot();
  })
})