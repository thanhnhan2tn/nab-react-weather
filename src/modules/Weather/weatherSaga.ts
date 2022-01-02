import { SagaIterator } from "redux-saga";
import { call, put, takeLatest } from "redux-saga/effects";

import logger from "../../utils/log";
import { ErrorMessage } from "../../constants";
import { loadLocation, loadWeather } from "./sagaActions";
import { getLocationService, getWeatherService } from "./weatherServices";
import { loadingLocation, loadLocationFailue, locationReceived, weatherReceived } from './weatherSlice';

export function* loadLocationSaga({
  payload,
}: {
  type: typeof loadLocation.type;
  payload: string;
}): SagaIterator {
  try {
    yield put(loadingLocation());
    const { data } = yield call(getLocationService, payload);
    const firstFound: { woeid: number } = data[0];
    yield put(locationReceived(data));
    yield put(loadWeather(firstFound.woeid));
  } catch (error: any) {
    logger.warn(error);
    yield put(loadLocationFailue({ message: ErrorMessage.ServerError}));
  }
}

export function* loadWeatherSaga({
  payload,
}: {
  type: typeof loadWeather.type;
  payload: string;
}): SagaIterator {
  try {
    const { data } = yield call(getWeatherService, payload);
    yield put(
      weatherReceived(data)
    );
  } catch (error: any) {
    logger.warn(error);
    yield put(loadLocationFailue({ message: ErrorMessage.ServerError}));
  }
}

export function* weatherSaga() {
  yield takeLatest(loadLocation.type, loadLocationSaga);
  yield takeLatest(loadWeather.type, loadWeatherSaga);
}