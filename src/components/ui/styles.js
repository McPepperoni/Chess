import styled from "styled-components/macro";

export const PlayerInfo = styled.div`
  box-sizing: border-box;
  position: absolute;
  background-color: white;
  display: flex;
  justify-content: space-between;
  height: 100vh;
  flex-direction: column;

  width: 15%;
  padding: 10px;
  z-index: 1000;

  &:first-of-type {
    left: 0;
    top: 0;
  }

  &:nth-of-type(2) {
    right: 0;
    bottom: 0;
  }

  p {
    line-height: 1;
    width: fit-content;
    margin: 0;
  }

  @media (orientation: portrait) {
    &:first-of-type,
    &:nth-of-type(2) {
      flex-direction: row;
      border-radius: 0;
      width: 100vw;
      height: 10%;
      padding: 10px;
    }
  }
`;

export const ColorIndicator = styled.div`
  font-size: 50px;
  line-height: 1;
  padding: 10px;
  border: 2px solid;
  border-radius: 10px;
  text-align: center;

  @media (orientation: portrait) {
    font-size: 24px;
    padding: 5px;
  }
`;
