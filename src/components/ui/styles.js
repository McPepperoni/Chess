import styled from "styled-components/macro";

export const PlayerInfo = styled.div`
  position: absolute;
  background-color: white;
  display: flex;
  justify-content: space-between;

  width: 20%;
  padding: 20px 40px;
  z-index: 1000;

  &:first-of-type {
    left: 0;
    top: 0;

    border-radius: 0 0 20px 0;
  }

  &:nth-of-type(2) {
    right: 0;
    bottom: 0;

    border-radius: 20px 0 0 0;
  }

  p {
    width: fit-content;
  }

  svg {
    font-size: 50px;
    line-height: 1;
    height: calc(100% - 24px);
    padding: 10px;
    border: 2px solid;
    border-radius: 10px;
  }
`;