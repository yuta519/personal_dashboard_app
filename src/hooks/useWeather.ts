import { useState } from "react";
import { OpenWeather } from "../Infra/OpenWeather";
import { City } from "../types/City";
import { Weather } from "../types/Weather";

export default function useWeather() {
  const [weather, setWeather] = useState<Weather | null>(null);

  const getWeatherByCity = async (city: City) => {
    const openWeather = new OpenWeather();
    const weather = await openWeather.getWeatherByLatAndLon(city.lat, city.lon);
    setWeather({
      ...weather,
      temperature: {
        ...weather.temperature,
        avg: convertKtoC(weather.temperature.avg),
        min: convertKtoC(weather.temperature.min),
        max: convertKtoC(weather.temperature.max),
      },
    });
  };

  const clear = () => setWeather(null);

  const convertKtoC = (k: number) => Math.ceil(k - 273.15);

  return { weather, getWeatherByCity, clear };
}
