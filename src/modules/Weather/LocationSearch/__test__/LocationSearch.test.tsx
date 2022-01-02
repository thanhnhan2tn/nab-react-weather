import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import LocationSearch, { LocationType } from '../LocationSearch';
const mockStore = configureStore([]);

describe('LocationSearch', () => {
  let props: LocationType, store: any;
  beforeEach(() => {
    store = mockStore({
      weather: {
        weather: {
          title: 'Ho Chi Minh',
          consolidated_weather: [],
          time: '2022-01-01'
        }
      },
    });
    props = {
      loading: false,
      onSearch: () => {},
      defaultValue: 'Ho Chi Minh'
    }
  });

  it('should render match snapshot', () => {
    const component = renderer.create(
      <Provider store={store}>
        <LocationSearch {...props} />
      </Provider>,
    );
    const snapshot = component.toJSON();
    expect(snapshot).toMatchSnapshot();
  })
})
