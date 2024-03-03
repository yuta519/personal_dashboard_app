import { useState } from "react";
import { OpenWeather } from "../Infra/OpenWeather";
import { City } from "../types/City";

export default function useCities() {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<{ message: string } | null>(null);

  const getCityByName = async (city: string, country: string = "") => {
    setLoading(true);
    setError(null);
    try {
      const openWeather = new OpenWeather();
      const result = await openWeather.getCityByName(city, country);
      setCities(result);
    } catch (error: any) {
      setError({ message: error?.message });
    } finally {
      setLoading(false);
    }
  };

  return { cities, loading, error, getCityByName };
}
