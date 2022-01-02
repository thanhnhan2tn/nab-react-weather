import { all } from 'redux-saga/effects';
import { weatherSaga } from './modules/Weather/weatherSaga';

export default function* rootSaga() {
  yield all([weatherSaga()]);
}