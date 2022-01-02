import axios from "axios";
import { API } from '../../config';

export const getWeatherService = async (id: string) => {
  const { data } = await axios.get(`${API}/weather/${id}`);
  return data;
}

export const getLocationService = async (value: string) => {
  const { data } = await axios.get(`${API}/weather?query=${value}&endpoint=search`);
  return data;
}