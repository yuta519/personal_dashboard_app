import axios, { AxiosError } from "axios";
import { City } from "../types/City";

export class OpenWeather {
  private apiKey: string;
  private url: string;

  constructor() {
    this.apiKey = process.env.REACT_APP_MOPENWEATHER_APIKEY as string;
    this.url = "http://api.openweathermap.org";
  }

  public async getCityByName(
    city: string,
    country: string = "",
    limit: number = 10
  ) {
    try {
      const url = `${this.url}/geo/1.0/direct?q=${city},${country}&limit=${limit}&appid=${this.apiKey}`;
      const result: City[] = await axios.get(url).then((res) => res.data);
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
}
