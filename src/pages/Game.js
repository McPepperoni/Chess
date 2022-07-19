import React, { useState } from "react";
import Board from "../components/board";
import LegalMoves from "../components/gameLogics/legalMoves";
import {
  NumToString,
  UpdateEnPassant,
  UpdateMap,
} from "../components/utils/Utils";

export default function Game({
  setCurrentPlayer,
  currentPlayer,
  children,
  taken1,
  setTaken1,
  taken2,
  setTaken2,
  winner,
  setWinner,
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
  const [enPassant, setEnPassant] = useState(new Array(64).fill(false));

  const [currentSelect, setCurrentSelect] = useState({ x: -1, y: -1 });
  const [prevSelect, setPrevSelect] = useState({ x: -1, y: -1 });
  const [promote, setPromote] = useState(false);
  const [swap, setSwap] = useState([]);

  return (
    <>
      <Board>
        {children}
        {promote === true ? (
          <Board.Promote
            setPromote={setPromote}
            setMap={setPieces}
            Map={pieces}
            pos={prevSelect}
          ></Board.Promote>
        ) : null}
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
                        setLegalMovesMap(() => {
                          var extraMoves = [];
                          if (pieces[i * 8 + j][0] === 5) {
                            extraMoves = LegalMoves.King(
                              { x: i, y: j },
                              pieces
                            );
                          }

                          var moves = LegalMoves(
                            { x: i, y: j },
                            pieces[i * 8 + j][0],
                            pieces
                          );

                          var swapAble = [];
                          extraMoves.forEach((item) => {
                            moves[item[0]] = 2;
                            swapAble.push(item);
                          });

                          setSwap(swapAble);

                          return moves;
                        });
                      }
                      if (legalMovesMap[i * 8 + j] > 1) {
                        var update = UpdateMap(
                          pieces,
                          currentSelect,
                          { x: i, y: j },
                          -1,
                          taken1,
                          taken2
                        );

                        var swapIdex = [];
                        for (var s = 0; s < swap.length; i++) {
                          if (swap[s][0] === i * 8 + j) {
                            swapIdex = swap[s][1];
                            break;
                          }
                        }

                        if (swapIdex.length > 0) {
                          update[0][swapIdex[0]][0] = swapIdex[3];
                          update[0][swapIdex[1]][0] = swapIdex[2];
                        }

                        setEnPassant(UpdateEnPassant(pieces, enPassant));
                        setPieces(update[0]);
                        setTaken1(update[1]);
                        setTaken2(update[2]);
                        setPrevSelect({ x: i, y: j });
                        setCurrentSelect({ x: -1, y: -1 });
                        setLegalMovesMap(() => new Array(64).fill(0));
                        setCurrentPlayer(() => (currentPlayer === 1 ? 2 : 1));

                        update[0].find((e) => e[0] === 5 && e[1] === 1)
                          ? update[0].find((e) => e[0] === 5 && e[1] === 2)
                            ? setWinner(0)
                            : setWinner(1)
                          : setWinner(2);

                        if (
                          pieces[i * 8 + j][0] === 0 &&
                          (i === 0 || i === 7)
                        ) {
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
