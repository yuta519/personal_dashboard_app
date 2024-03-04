import styled from "styled-components";

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`;

type ColumnProps = {
  grid?: number;
};

export const Column = styled.div<ColumnProps>`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;

  @media (max-width: 768px) {
    flex: 0 0 ${(props) => (props.grid ? (props.grid / 12) * 100 : 100)}%;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    flex: 0 0 ${(props) => (props.grid ? (props.grid / 12) * 100 : 50)}%;
  }

  @media (min-width: 1025px) {
    flex: 0 0 ${(props) => (props.grid ? (props.grid / 12) * 100 : 33.33)}%;
  }
`;
