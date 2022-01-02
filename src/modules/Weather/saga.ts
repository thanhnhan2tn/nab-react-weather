import logger from "../../utils/log";
import { ErrorMessage } from "./../../constants";
import { SagaIterator } from "redux-saga";
import { call, put, takeLatest } from "redux-saga/effects";
import { loadLocation, loadWeather } from "./sagaActions";
import { getLocationService, getWeatherService } from "./weatherServices";
import { loadingLocation, loadLocationFailue, locationReceived } from './weatherSlice';

function* loadLocationSaga({
  payload,
}: {
  type: typeof loadLocation.type;
  payload: string;
}): SagaIterator {
  try {
    yield put(loadingLocation());
    const response = yield call(getLocationService, payload);
    if (response.length <= 0) {
      yield put(
        loadLocationFailue({
          message: ErrorMessage.NoResult,
        })
      );
    }
    const firstFound: { woeid: number } = response[0];
    yield put(loadWeather(firstFound.woeid));
  } catch (error: any) {
    logger.error(error);
    yield put(loadLocationFailue(error));
  }
}

function* loadWeatherSaga({
  payload,
}: {
  type: typeof loadLocation.type;
  payload: string;
}): SagaIterator {
  try {
    const weatherData = yield call(getWeatherService, payload);
    yield put(
      locationReceived({
        locations: weatherData,
        weather: weatherData.data,
      })
    );
  } catch (error: any) {
    logger.error(error);
    yield put(loadLocationFailue(error));
  }
}

export function* weatherSaga() {
  yield takeLatest(loadLocation.type, loadLocationSaga);
  yield takeLatest(loadWeather.type, loadWeatherSaga);
}