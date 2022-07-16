import React, { useState } from "react";
import Board from "../components/board";
import LegalMoves from "../components/gameLogics/legalMoves";
import { NumToString, UpdateMap } from "../components/utils/Utils";

export default function Game({
  setCurrentPlayer,
  currentPlayer,
  children,
  taken1,
  setTaken1,
  taken2,
  setTaken2,
  ...restProps
}) {
  const tiles = Array(8).fill(0);
  const [pieces, setPieces] = useState([
    [1, 2, false],
    [2, 2, false],
    [3, 2, false],
    [4, 2, false],
    [5, 2, false],
    [3, 2, false],
    [2, 2, false],
    [1, 2, false],
    [0, 2, false],
    [0, 2, false],
    [0, 2, false],
    [0, 2, false],
    [0, 2, false],
    [0, 2, false],
    [0, 2, false],
    [0, 2, false],
    [-1, 2, false],
    [-1, 2, false],
    [-1, 2, false],
    [-1, 2, false],
    [-1, 2, false],
    [-1, 2, false],
    [-1, 2, false],
    [-1, 2, false],
    [-1, 2, false],
    [-1, 2, false],
    [-1, 2, false],
    [-1, 2, false],
    [-1, 2, false],
    [-1, 2, false],
    [-1, 2, false],
    [-1, 2, false],
    [-1, 2, false],
    [-1, 2, false],
    [-1, 2, false],
    [-1, 2, false],
    [-1, 2, false],
    [-1, 2, false],
    [-1, 2, false],
    [-1, 2, false],
    [-1, 2, false],
    [-1, 2, false],
    [-1, 2, false],
    [-1, 2, false],
    [-1, 2, false],
    [-1, 2, false],
    [-1, 2, false],
    [-1, 2, false],
    [0, 1, false],
    [0, 1, false],
    [0, 1, false],
    [0, 1, false],
    [0, 1, false],
    [0, 1, false],
    [0, 1, false],
    [0, 1, false],
    [1, 1, false],
    [2, 1, false],
    [3, 1, false],
    [4, 1, false],
    [5, 1, false],
    [3, 1, false],
    [2, 1, false],
    [1, 1, false],
  ]);
  const [legalMovesMap, setLegalMovesMap] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  const [currentSelect, setCurrentSelect] = useState({ x: -1, y: -1 });
  const [prevSelect, setPrevSelect] = useState({x: -1, y: -1});
  const [promote, setPromote] = useState(false)

  return (
    <>
      <Board>
        {children}
        {promote === true ? <Board.Promote setPromote={setPromote} setMap={setPieces} Map={pieces} pos={prevSelect}></Board.Promote> : null}
        <Board.Grid>
          {tiles.map((_, i) =>
            tiles.map((_, j) => {
              return (
                <Board.Tile key={NumToString(i, j)} row={i}>
                  <Board.Piece
                    currentPlayer={currentPlayer}
                    id={pieces[i * 8 + j][0]}
                    side={pieces[i * 8 + j][1]}
                    valid={legalMovesMap[i * 8 + j]}
                    selected={currentSelect.x === i && currentSelect.y === j}
                    onClick={() => {
                      if (
                        pieces[i * 8 + j][0] !== -1 &&
                        currentPlayer === pieces[i * 8 + j][1]
                      ) {
                        setCurrentSelect({ x: i, y: j });
                        setLegalMovesMap(
                          LegalMoves(
                            { x: i, y: j },
                            pieces[i * 8 + j][0],
                            pieces
                          )
                        );
                      }
                      if (legalMovesMap[i * 8 + j] > 1) {
                        const update = UpdateMap(pieces, currentSelect, { x: i, y: j }, -1,taken1, taken2)
                        setPieces(
                          update[0]
                        );
                        setTaken1(update[1])
                        setTaken2(update[2])
                        setPrevSelect({ x: i, y: j });
                        setCurrentSelect({ x: -1, y: -1 });
                        setLegalMovesMap(() => new Array(64).fill(0));
                        setCurrentPlayer(() => (currentPlayer === 1 ? 2 : 1));

                        if(pieces[i * 8 + j][0] === 0 && (i === 0 || i === 7)) {
                          setPromote(true);
                        }
                      }
                    }}
                  ></Board.Piece>
                </Board.Tile>
              );
            })
          )}
        </Board.Grid>
      </Board>
    </>
  );
}
