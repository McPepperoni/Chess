import React, { useState } from "react";
import Board from "../components/board";
import LegalMoves from "../components/gameLogics/legalMoves";
import { NumToString } from "../components/utils/Utils";

export default function Game({ currentPlayer, children, ...restProps }) {
  const tiles = Array(8).fill(0);
  const [pieces, setPieces] = useState([
    [1, 2],
    [2, 2],
    [3, 2],
    [4, 2],
    [5, 2],
    [3, 2],
    [2, 2],
    [1, 2],
    [0, 2],
    [0, 2],
    [0, 2],
    [0, 2],
    [0, 2],
    [0, 2],
    [0, 2],
    [0, 2],
    [-1, 2],
    [-1, 2],
    [-1, 2],
    [-1, 2],
    [-1, 2],
    [-1, 2],
    [-1, 2],
    [-1, 2],
    [-1, 2],
    [-1, 2],
    [-1, 2],
    [-1, 2],
    [-1, 2],
    [-1, 2],
    [-1, 2],
    [-1, 2],
    [-1, 2],
    [-1, 2],
    [-1, 2],
    [-1, 2],
    [-1, 2],
    [-1, 2],
    [-1, 2],
    [-1, 2],
    [-1, 2],
    [-1, 2],
    [-1, 2],
    [-1, 2],
    [-1, 2],
    [-1, 2],
    [-1, 2],
    [-1, 2],
    [0, 1],
    [0, 1],
    [0, 1],
    [0, 1],
    [0, 1],
    [0, 1],
    [0, 1],
    [0, 1],
    [1, 1],
    [2, 1],
    [3, 1],
    [4, 1],
    [5, 1],
    [3, 1],
    [2, 1],
    [1, 1],
  ]);

  return (
    <Board>
      {children}
      <Board.Grid>
        {tiles.map((_, i) =>
          tiles.map((_, j) => {
            return (
              <Board.Tile key={NumToString(i, j)} row={i}>
                <Board.Piece
                  currentPlayer={currentPlayer}
                  id={pieces[i * 8 + j][0]}
                  side={pieces[i * 8 + j][1]}
                  onClick={() => {
                    console.log(
                      LegalMoves({ x: i, y: j }, pieces[i * 8 + j][0], pieces)
                    );
                  }}
                ></Board.Piece>
              </Board.Tile>
            );
          })
        )}
      </Board.Grid>
    </Board>
  );
}
