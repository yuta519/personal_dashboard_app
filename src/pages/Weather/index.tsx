import {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useCallback,
  useState,
} from "react";
import Title from "../../components/Title";
import useCities from "../../hooks/useCities";
import styled, { keyframes } from "styled-components";
import useWeather from "../../hooks/useWeather";
import CurrentWeathner from "./CurrentWeather";
import Cities from "./Cities";

export default function Weather() {
  const [keyword, setKeyword] = useState<string>("");

  const { cities, loading: loadingCities, getCityByName } = useCities();
  const {
    weather,
    loading: loadingWeather,
    getWeatherByCity,
    clear,
  } = useWeather();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setKeyword(e.target.value);

  const handleSearch = useCallback(
    async (e: FormEvent<HTMLFormElement> | MouseEvent<HTMLElement>) => {
      e.preventDefault();

      if (!keyword.length) return;
      clear();

      await getCityByName(keyword);
    },
    [clear, getCityByName, keyword]
  );

  const handleClick = async (e: MouseEvent<HTMLElement>) => {
    const city = cities[Number(e.currentTarget.id as string)];
    await getWeatherByCity(city);
  };

  return (
    <>
      <Title>Weather</Title>
      <SearchWrapper>
        <StyledForm onSubmit={handleSearch}>
          <StyledInput
            name='text'
            type='text'
            value={keyword}
            onChange={handleChange}
            placeholder='Type a city name...'
            required
          />
        </StyledForm>
      </SearchWrapper>
      {loadingCities || loadingWeather ? (
        <Loader />
      ) : (
        <>
          {!!cities.length && <Cities cities={cities} onClick={handleClick} />}
          {weather && <CurrentWeathner weather={weather} />}
        </>
      )}
    </>
  );
}

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Loader = styled.div`
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  animation: ${spin} 2s linear infinite;
`;

const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 20px;
  padding: 0 20px;
  // border: 2px solid #dcdcdc;
  // border-radius: 10px;

  @media (max-width: 768px) {
    width: 80%;
    flex: 0 0 100%;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    width: 60%;
    flex: 0 0 75%;
  }

  @media (min-width: 1025px) {
    width: 50%;
    flex: 0 0 50%;
  }
`;

const StyledForm = styled.form`
  width: 80%;
`;
const StyledInput = styled.input`
  width: 100%;
  padding: 2px;
  border-top: 0px;
  border-right: 0px;
  border-left: 0px;
  border-bottom: 1px solid #ddd;
  font-size: 16px;
`;
