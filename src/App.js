import { useState } from "react";
import "./App.css";
import UI from "./components/ui";
import Game from "./pages/Game";
import Welcome from "./pages/welcome";

function App() {
  const [player1, setPlayer1] = useState({ ign: "", ready: false });
  const [player2, setPlayer2] = useState({ ign: "", ready: false });
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [taken1, setTaken1] = useState([])
  const [taken2, setTaken2] = useState([])

  return (
    <>
      {player1.ready === true && player2.ready === true ? (
        <Game currentPlayer={currentPlayer} setCurrentPlayer={setCurrentPlayer} taken1={taken1} setTaken1={setTaken1} taken2={taken2} setTaken2={setTaken2}>
          <UI className="player2" player={2} currentPlayer={currentPlayer} taken={taken1}>
            {player2.ign}
          </UI>
          <UI className="player1" player={1} currentPlayer={currentPlayer} taken={taken2}>
            {player1.ign}
          </UI>
        </Game>
      ) : (
        <Welcome
          setPlayer1={setPlayer1}
          setPlayer2={setPlayer2}
          player1={player1}
          player2={player2}
        />
      )}
    </>
  );
}

export default App;
