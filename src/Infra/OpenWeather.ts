import axios, { AxiosError } from "axios";
import { City } from "../types/City";
import { Weather } from "../types/Weather";

type WeatherResponse = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

export class OpenWeather {
  private apiKey: string;
  private url: string;

  constructor() {
    this.apiKey = process.env.REACT_APP_MOPENWEATHER_APIKEY as string;
    this.url = "http://api.openweathermap.org";
  }

  private async getRequest<T>(url: string): Promise<T> {
    try {
      const result = await axios.get(url).then((res) => res.data);
      return result;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message: string }>;
        throw new Error(
          axiosError.response?.data?.message ??
            "Network error occurred. Please ask service administrator"
        );
      }
      throw new Error(
        "Something went wrong. Please ask service administrator."
      );
    }
  }

  public async getCityByName(
    city: string,
    country: string = "",
    limit: number = 10
  ) {
    const url = `${this.url}/geo/1.0/direct?q=${city},${country}&limit=${limit}&appid=${this.apiKey}`;
    return await this.getRequest<City[]>(url);
  }

  public async getWeatherByLatAndLon(
    lat: number,
    lon: number
  ): Promise<Weather> {
    const url = `${this.url}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;
    const response = await this.getRequest<WeatherResponse>(url);
    const weather: Weather = {
      name: response.name,
      weather: response.weather,
      temperature: {
        avg: response.main.temp,
        feelsLike: response.main.feels_like,
        min: response.main.temp_min,
        max: response.main.temp_max,
      },
      pressure: response.main.pressure,
      humidity: response.main.humidity,
    };
    return weather;
  }
}
