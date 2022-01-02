import { call, put, takeLatest } from "redux-saga/effects";
import { loadingLocation, loadLocationFailue, weatherReceived } from "../weatherSlice";
import { weatherSaga, loadLocationSaga, loadWeatherSaga } from "../weatherSaga";
import { getWeatherService, getLocationService } from '../weatherServices';
import { loadLocation, loadWeather } from "../sagaActions";
import { ErrorMessage } from "../../../constants";

jest.mock("../weatherServices", () => ({
  getLocationService: () => ({
    data: [
      {
        title: "Ho Chi Minh City",
        location_type: "City",
        woeid: 1252431,
        latt_long: "10.759180,106.662498",
      },
    ],
  }),
  getWeatherService: () => ({
    data: {
      title: "Ho Chi Minh City",
      location_type: "City",
      woeid: 1252431,
      latt_long: "10.759180,106.662498",
    },
  }),
}));

describe("Weather saga", () => {
  it("initWeatherSagas watcher", () => {
    const genObject = weatherSaga();
    let generator = genObject.next();
    expect(generator.value).toEqual(
      takeLatest(loadLocation.type, loadLocationSaga)
    );
    generator = genObject.next();
    expect(generator.value).toEqual(
      takeLatest(loadWeather.type, loadWeatherSaga)
    );
  });

  it("loadLocationSaga should call loadingLocation", async () => {
    const actions = {
      type: loadLocation.type,
      payload: "Ho Chi Minh",
    };
    const genObject = loadLocationSaga(actions);
    let generator = genObject.next();
    expect(generator.value).toEqual(put(loadingLocation()));
    generator = genObject.next();
    expect(generator.value).toEqual(
      call(await getLocationService, actions.payload)
    );
    generator = genObject.next();
    expect(generator.value).toEqual(
      put(loadLocationFailue({ message: ErrorMessage.ServerError }))
    );
    generator = genObject.next();
    expect(generator.done).toBeTruthy();
  });

  it("loadWeatherSaga should call getWeatherService", async () => {
    const actions = {
      type: loadWeather.type,
      payload: "1252431",
    };
    const genObject = loadWeatherSaga(actions);
    let generator = genObject.next();
    expect(generator.value).toEqual(
      call(await getWeatherService, actions.payload)
    );
    generator = genObject.next();
    expect(generator.value).toEqual(
      put(loadLocationFailue({ message: ErrorMessage.ServerError }))
    );

    generator = genObject.next();
    expect(generator.done).toBeTruthy();
  });
});
