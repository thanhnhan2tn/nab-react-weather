import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface ILocation {
  title: string;
  location_type: string;
  woeid: number;
  latt_long: string;
}

interface IWeatherState {
  loading?: boolean;
  error?: string;
  locations: ILocation[];
  weather?: unknown;
}

const initialState: IWeatherState = {
  loading: false,
  error: "",
  locations: [
    {
      title: "Ho Chi Minh City",
      location_type: "City",
      woeid: 1252431,
      latt_long: "10.759180,106.662498",
    },
  ],
  weather: {},
};

export const weatherSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    loadingLocation() {
      return {
        ...initialState,
        loading: true,
        error: "",
      };
    },
    locationReceived(state: IWeatherState, action: { payload: IWeatherState }) {
      return {
        ...state,
        loading: false,
        locations: action.payload.locations,
        weather: action.payload.weather,
        error: "",
      };
    },
    loadLocationFailue(state, action: { payload: { message: string } }) {
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { loadingLocation, locationReceived, loadLocationFailue } =
  weatherSlice.actions;

export const selectWeather = (state: RootState) => state.weather.weather;
export const selectDataState = (state: RootState) => state.weather;
export const selectLocation = (state: RootState) => state.weather.locations;

export default weatherSlice.reducer;
