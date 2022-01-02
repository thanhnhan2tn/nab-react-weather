export interface IWeatherInfo {
  air_pressure?: number
  id: number
  applicable_date?: Date | string
  time?:string,
  title?: string,
  the_temp?: number,
  max_temp?: number
  min_temp?: number
  weather_state_abbr: string
  weather_state_name: string
  wind_speed?: number
}

export interface IWeather {
  title: string
  time: string
  consolidated_weather: IWeatherInfo[]
}
