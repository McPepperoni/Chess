import React from "react";
import Login from "../components/login";

export default function Welcome({ setPlayer1, setPlayer2, player1, player2 }) {
  return (
    <Login>
      <Login.Panel
        player={1}
        setPlayer={setPlayer1}
        currentPlayer={player1}
      ></Login.Panel>
      <Login.Panel
        player={2}
        setPlayer={setPlayer2}
        currentPlayer={player2}
      ></Login.Panel>
    </Login>
  );
}
