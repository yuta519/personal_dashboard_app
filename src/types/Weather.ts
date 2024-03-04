export type Weather = {
  main: string;
  description: string;
  icon: string;
  temperature: {
    avg: number;
    feelsLike: number;
    min: number;
    max: number;
  };
  pressure: number;
  humidity: number;
  name: string;
};
