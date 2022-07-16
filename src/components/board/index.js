import React, { useEffect, useRef, useState } from "react";
import { Bishop, King, Knight, Pawn, Queen, Rook } from "../Global";
import { UpdateMap } from "../utils/Utils";
import {
  Container,
  CoordinateHorizontal,
  CoordinateVertical,
  Cover,
  Grid,
  Piece,
  PieceIndicator,
  Promotion,
  Tile,
} from "./styles";

export default function Board({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

Board.Grid = function BoardGrid({ children, ...restProps }) {
  const tiles = Array(8).fill(0);

  return (
    <Grid {...restProps}>
      {children}
      <CoordinateHorizontal>
        {tiles.map((_, i) => (
          <p key={String.fromCharCode(i + 65)}>{String.fromCharCode(i + 65)}</p>
        ))}
      </CoordinateHorizontal>
      <CoordinateVertical>
        {tiles.map((_, i) => (
          <p key={i}>{i}</p>
        ))}
      </CoordinateVertical>
    </Grid>
  );
};

Board.Tile = function BoardTile({ children, ...restProps }) {
  return <Tile {...restProps}>{children}</Tile>;
};

Board.Piece = function BoardPiece({ id = 0, children, ...restProps }) {
  return (
    <Piece {...restProps} PieceID={id}>
      {(() => {
        switch (id) {
          case 0:
            return <Pawn />;
          case 1:
            return <Rook />;
          case 2:
            return <Knight />;
          case 3:
            return <Bishop />;
          case 4:
            return <Queen />;
          case 5:
            return <King />;
          default:
            return <></>;
        }
      })()}
    </Piece>
  );
};

Board.Promote = function BoardPromote({setPromote, Map, setMap, pos, children, ...restProps }) {
  const prom = [<Rook />, <Knight />, <Bishop />, <Queen />];
  return (
    <Cover>
      <Promotion>
        <span>Please select promotion</span>
        {prom.map((item, index) => <PieceIndicator key={index} onClick={() => {
          const update = UpdateMap(Map, pos, pos, index + 1, [], [])
          setMap(
            update[0]
          );
          setPromote(false);
        }} {...restProps}>{item}</ PieceIndicator>)}
      </Promotion>
    </Cover>
  );
};
