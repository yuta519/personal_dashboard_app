import { MouseEvent } from "react";
import styled from "styled-components";
import Subtitle from "../../components/Subtitle";
import { City } from "../../types/City";

export default function Cities({
  cities,
  onClick,
}: {
  cities: City[];
  onClick: (e: MouseEvent<HTMLElement>) => void;
}) {
  return (
    <Wrapper>
      <Subtitle>Choose City</Subtitle>
      {cities.map((city, index) => (
        <CityRow key={index} id={index.toString()} onClick={onClick}>
          <StyledText>
            {`${city.name} (${city.state ? `${city.state}, ` : ""}${
              city.country
            })`}
          </StyledText>
        </CityRow>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  @media (max-width: 768px) {
    width: 90%;
    flex: 0 0 100%;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    width: 80%;
    flex: 0 0 80%;
  }

  @media (min-width: 1025px) {
    width: 70%;
    flex: 0 0 50%;
  }
`;
const StyledText = styled.p`
  font-family: Arial, sans-serif;
  width: 100%;
  display: inline;
  margin: 0px 5px;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    font-size: 16px;
  }

  @media (min-width: 1025px) {
    font-size: 18px;
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
