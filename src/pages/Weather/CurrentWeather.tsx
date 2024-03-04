import styled from "styled-components";
import { Row, Column } from "../../components/Grid";
import Subtitle from "../../components/Subtitle";
import { Weather } from "../../types/Weather";

export default function CurrentWeathner({ weather }: { weather: Weather }) {
  return (
    <Wrapper>
      <Subtitle>Current Weather</Subtitle>
      <Row>
        <StyledColumn grid={4}>
          <Box>
            <StyledText>{`${weather.main}`}</StyledText>
            <img src={weather.icon} alt={weather.main} />
          </Box>
        </StyledColumn>
        <StyledColumn grid={4}>
          <Box>
            <StyledText>Temperature</StyledText>
            <Temperature>{`${weather.temperature.avg}°C`}</Temperature>
          </Box>
        </StyledColumn>
        <StyledColumn grid={4}>
          <Box>
            <StyledText>Humidity</StyledText>
            <Temperature>{`${weather.humidity}%`}</Temperature>
          </Box>
        </StyledColumn>
      </Row>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  @media (max-width: 768px) {
    width: 100%;
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

const Box = styled.div`
  display: flex;
  flex-direction: column;
  vertical-align: middle;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  padding: 10px 10px;

  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    width: 130px;
    height: 130px;
  }

  @media (min-width: 1025px) {
    width: 180px;
    height: 180px;
  }
`;

const StyledColumn = styled(Column)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledText = styled.p`
  font-family: Arial, sans-serif;
  width: 100%;
  display: inline;
  margin: 0;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    font-size: 16px;
  }

  @media (min-width: 1025px) {
    font-size: 18px;
  }
`;

const Temperature = styled.p`
  font-family: Arial, sans-serif;
  width: 100%;
  display: inline;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 24px;
    text-align: center;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    font-size: 36px;
  }

  @media (min-width: 1025px) {
    font-size: 40px;
  }
`;
