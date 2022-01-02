import { createAction } from "@reduxjs/toolkit";

export const loadLocation = createAction(
  "weather/getLocationAsync",
  function prepare(search: string) {
    return {
      payload: search,
    };
  }
);
export const loadWeather = createAction(
  "weather/loadWeatherAsync",
  function prepare(data: any) {
    return {
      payload: data,
    };
  }
);