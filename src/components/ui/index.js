import React, { useEffect } from "react";
import { useStopwatch } from "react-timer-hook";
import { Pawn } from "../Global";
import { PlayerInfo } from "./styles";

export default function UI({ player, currentPlayer, children, ...restProps }) {
  const { seconds, minutes, hours, start, pause } = useStopwatch({
    autoStart: false,
  });

  useEffect(() => {
    currentPlayer === player ? start() : pause();
  }, [currentPlayer]);

  return (
    <>
      <PlayerInfo>
        <div>
          {hours.toString().padStart(2, "0") +
            ":" +
            minutes.toString().padStart(2, "0") +
            ":" +
            seconds.toString().padStart(2, "0")}
          <p>{children}</p>
        </div>
        <div>
          <Pawn {...restProps} />
        </div>
      </PlayerInfo>
    </>
  );
}
