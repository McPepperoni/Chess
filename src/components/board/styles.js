import styled from "styled-components/macro";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

export const Grid = styled.div`
  display: grid;
  position: relative;
  grid-template-columns: repeat(8, 1fr);
  aspect-ratio: 1;
  height: 90%;
  border: 2px solid white;
  box-sizing: border-box;
`;

export const CoordinateHorizontal = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  background-color: transparent;
  color: #999;
  position: absolute;
  bottom: 100%;
  font-size: 30px;

  p {
    margin: 0;
    width: calc(100% / 7);
    text-align: center;
    margin-bottom: 10px;
  }
`;

export const CoordinateVertical = styled(CoordinateHorizontal)`
  flex-direction: column;
  width: fit-content;
  height: 100%;
  bottom: 0;
  right: 100%;
  margin-right: 20px;

  p {
    line-height: 1;
    margin: 0;
    width: 100%;
    height: calc(100% / 7);
    text-align: center;
    margin-bottom: 0px;
    display: flex;
    align-items: center;
  }
`;

export const Tile = styled.div`
  width: 100%;
  aspect-ratio: 1;
  font-size: 70px;

  &:nth-last-of-type(2n) {
    background-color: ${({ row }) => (row % 2 === 0 ? "#444" : "#777")};
  }

  &:nth-last-of-type(2n + 1) {
    background-color: ${({ row }) => (row % 2 === 0 ? "#666" : "#444")};
  }
`;

export const Piece = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  background-color: ${({ valid }) =>
    valid === 3 ? "#e2514c" : valid === 2 ? "#779455" : "transparent"};
  border: ${({ valid }) => (valid === 2 ? "1px white dashed" : "0")};

  cursor: ${({ currentPlayer, PieceID, side, valid }) =>
    valid > 1 || (PieceID > -1 && currentPlayer === side)
      ? "pointer"
      : "initial"};
  color: ${({ side }) => (side === 1 ? "white" : "black")};

  ::before {
    content: "";
    box-sizing: border-box;
    display: ${({ selected }) => (selected === true ? "flex" : "none")};
    position: absolute;
    border: ${({ side }) =>
      side === 1 ? "4px dashed white" : "4px dashed black"};
    width: 100%;
    height: 100%;
  }

  &:hover {
    ::before {
      display: ${({ PieceID, currentPlayer, side }) =>
        PieceID > -1 && currentPlayer === side ? "flex" : "none"};
    }
  }
`;

export const Cover = styled.div`
  display: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
`;
