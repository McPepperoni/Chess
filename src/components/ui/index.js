import React, { useEffect } from "react";
import { useTimer } from "react-timer-hook";
import { Bishop, King, Knight, Pawn, Queen, Rook } from "../Global";
import { ColorIndicator, PlayerInfo } from "./styles";

export default function UI({
  player,
  currentPlayer,
  children,
  taken,
  winner,
  ...restProps
}) {
  var t = new Date(); // Epoch
  t.setSeconds(t.getSeconds() + 600);

  const { seconds, minutes, hours, pause, start } = useTimer({
    expiryTimestamp: t,
    onExpire: () => console.warn("onExpire called"),
  });

  useEffect(() => {
    currentPlayer === player && winner === 0 ? start() : pause();
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
          {taken.map((id) => {
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
          })}
        </div>
        <ColorIndicator {...restProps}>
          <Pawn />
        </ColorIndicator>
      </PlayerInfo>
    </>
  );
}
