import { ChangeEvent, MouseEvent, useCallback, useState } from "react";
import Input from "../components/Input";
import Title from "../components/Title";
import Button from "../components/Button";
import useCities from "../hooks/useCities";
import styled, { keyframes } from "styled-components";
import Subtitle from "../components/Subtitle";
import useWeather from "../hooks/useWeather";

export default function Weather() {
  const [keyword, setKeyword] = useState<string>("");

  const { cities, loading: loadingCities, getCityByName } = useCities();
  const { weather, getWeatherByCity, clear } = useWeather();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setKeyword(e.target.value);

  const handleSearch = useCallback(async () => {
    if (!keyword.length) return;
    clear();

    getCityByName(keyword);
  }, [clear, getCityByName, keyword]);

  const handleClick = async (e: MouseEvent<HTMLElement>) => {
    const city = cities[Number(e.currentTarget.id as string)];
    await getWeatherByCity(city);
  };

  return (
    <>
      <Title>Weather</Title>
      <Subtitle>Search City</Subtitle>
      <Wrapper>
        <Input
          type='text'
          placeholder='Enter city'
          value={keyword}
          onChange={handleChange}
        />
        <Button onClick={handleSearch}>Search City</Button>
      </Wrapper>
      {loadingCities ? (
        <Loader />
      ) : (
        <>
          {!!cities.length && <Subtitle>Choose City</Subtitle>}
          <Wrapper>
            {cities.map((city, index) => (
              <CityRow key={index} onClick={handleClick}>
                <StyledText>
                  {`${city.name} (${city.state ? `${city.state}, ` : ""}${
                    city.country
                  })`}
                </StyledText>
              </CityRow>
            ))}
          </Wrapper>
        </>
      )}
      {weather && (
        <Wrapper>
          <Subtitle>Weather</Subtitle>
          <StyledText>{`Temperature: ${weather.temperature.avg}°C`}</StyledText>
          <StyledText>{`Humidity: ${weather.humidity}%`}</StyledText>
        </Wrapper>
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

const Wrapper = styled.div`
  margin: 10px 20px;
  padding: 0 20px;

  @media (max-width: 768px) {
    width: 100%;
    flex: 0 0 100%;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    width: 85%;
    flex: 0 0 80%;
  }

  @media (min-width: 1025px) {
    width: 65%;
    flex: 0 0 50%;
  }
`;
const StyledText = styled.p`
  font-family: Arial, sans-serif;
  width: 100%;
  display: inline;
  min-width: 200px;
  margin: 10px 40px;

  @media (max-width: 768px) {
    font-size: 18px;
    margin: 0 5px;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    font-size: 20px;
    margin: 10px 20px;
  }

  @media (min-width: 1025px) {
    font-size: 24px;
    margin: 10px 40px;
  }
`;

const CityRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 10px 0;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #f9f9f9;
  }
`;