import React from "react";
import { Pawn } from "../Global";
import { Container, InfoBoard } from "./styles";

export default function Winner({ winner, children, ...restProps }) {
  return (
    <Container {...restProps}>
      {children}
      <InfoBoard className={winner === 1 ? "player1" : "player2"}>
        {winner === 1 ? "White wins " : "Black wins "}
        <Pawn />
      </InfoBoard>
    </Container>
  );
}
