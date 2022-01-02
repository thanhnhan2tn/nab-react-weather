import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import Weather from '..';
import * as hooks from '../../../hooks';

const mockStore = configureStore([]);

describe('Weather', () => {
  let store: any;
  let spyOnUseSelector: any;
  beforeEach(() => {
    store = mockStore({
      loading: false,
      error: '',
      weather: {
        consolidated_weather: [
          {
            id: 6135596511657984,
            weather_state_name: 'Heavy Cloud',
            weather_state_abbr: 'hc',
            applicable_date: '2022-01-01',
            min_temp: 21.619999999999997,
            max_temp: 31.939999999999998,
            the_temp: 30.425,
          },
          {
            id: 5195447531470848,
            weather_state_name: 'Heavy Cloud',
            weather_state_abbr: 'hc',
            applicable_date: '2022-01-02',
            min_temp: 23.285,
            max_temp: 32.485,
            the_temp: 31.155
          },
          {
            id: 4885473165049856,
            weather_state_name: 'Showers',
            weather_state_abbr: 's',
            applicable_date: '2022-01-03',
            min_temp: 23.450000000000003,
            max_temp: 30.345,
            the_temp: 28.990000000000002
          },
          {
            id: 4716299344150528,
            weather_state_name: 'Heavy Cloud',
            weather_state_abbr: 'hc',
            applicable_date: '2022-01-04',
            min_temp: 22.975,
            max_temp: 32.035,
            the_temp: 29.56
          },
          {
            id: 6218995012206592,
            weather_state_name: 'Showers',
            weather_state_abbr: 's',
            applicable_date: '2022-01-05',
            min_temp: 23.085,
            max_temp: 32.504999999999995,
            the_temp: 29.765
          },
          {
            id: 6200749722697728,
            weather_state_name: 'Heavy Cloud',
            weather_state_abbr: 'hc',
            applicable_date: '2022-01-06',
            min_temp: 23.674999999999997,
            max_temp: 32.83,
            the_temp: 29.19
          }
        ],
        time: '2022-01-01T14:35:59.233483+07:00',
        sun_rise: '2022-01-01T06:11:53.101222+07:00',
        sun_set: '2022-01-01T17:42:05.306416+07:00',
        timezone_name: 'LMT',
        title: "Ho Chi Minh City",
        location_type: "City",
        woeid: 1252431,
        latt_long: "10.759180,106.662498",
        timezone: "Asia/Ho_Chi_Minh",
      },
    });
    spyOnUseSelector = jest.spyOn(hooks, 'useAppSelector');
    spyOnUseSelector.mockReturnValue({
      consolidated_weather: [
        {
          id: 6135596511657984,
          weather_state_name: 'Heavy Cloud',
          weather_state_abbr: 'hc',
          applicable_date: '2022-01-01',
          min_temp: 21.619999999999997,
          max_temp: 31.939999999999998,
          the_temp: 30.425,
        },
        {
          id: 5195447531470848,
          weather_state_name: 'Heavy Cloud',
          weather_state_abbr: 'hc',
          applicable_date: '2022-01-02',
          min_temp: 23.285,
          max_temp: 32.485,
          the_temp: 31.155
        },
        {
          id: 4885473165049856,
          weather_state_name: 'Showers',
          weather_state_abbr: 's',
          applicable_date: '2022-01-03',
          min_temp: 23.450000000000003,
          max_temp: 30.345,
          the_temp: 28.990000000000002
        },
        {
          id: 4716299344150528,
          weather_state_name: 'Heavy Cloud',
          weather_state_abbr: 'hc',
          applicable_date: '2022-01-04',
          min_temp: 22.975,
          max_temp: 32.035,
          the_temp: 29.56
        },
        {
          id: 6218995012206592,
          weather_state_name: 'Showers',
          weather_state_abbr: 's',
          applicable_date: '2022-01-05',
          min_temp: 23.085,
          max_temp: 32.504999999999995,
          the_temp: 29.765
        },
        {
          id: 6200749722697728,
          weather_state_name: 'Heavy Cloud',
          weather_state_abbr: 'hc',
          applicable_date: '2022-01-06',
          min_temp: 23.674999999999997,
          max_temp: 32.83,
          the_temp: 29.19
        }
      ],
      time: '2022-01-01T14:35:59.233483+07:00',
      sun_rise: '2022-01-01T06:11:53.101222+07:00',
      sun_set: '2022-01-01T17:42:05.306416+07:00',
      timezone_name: 'LMT',
      title: "Ho Chi Minh City",
      location_type: "City",
      woeid: 1252431,
      latt_long: "10.759180,106.662498",
      timezone: "Asia/Ho_Chi_Minh",
    });
  });

  it('should render match  snapshot', () => {
    const component = renderer.create(
      <Provider store={store}>
        <Weather />
      </Provider>,
    );
    const snapshot = component.toJSON();
    expect(snapshot).toMatchSnapshot();
  })
})
