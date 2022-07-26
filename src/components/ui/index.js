import React, { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import { Bishop, King, Knight, Pawn, Queen, Rook } from "../Global";
import { ColorIndicator, PlayerInfo } from "./styles";

export default function UI({
  player,
  currentPlayer,
  children,
  taken,
  winner,
  setWinner,
  h = 0,
  m = 0,
  s = 600,
  ...restProps
}) {
  const [Time, setTime] = useState({ h: h, m: m, s: s });
  var t = new Date();
  t.setSeconds(t.getSeconds() + Time.h * 3600 + Time.m * 60 + Time.s);

  const { seconds, minutes, hours, pause, start, restart } = useTimer({
    expiryTimestamp: t,
    onExpire: () => console.warn("onExpire called"),
  });

  const handleTimeStart = () => {
    t = new Date();
    t.setSeconds(t.getSeconds() + Time.h * 3600 + Time.m * 60 + Time.s);
    Time.h * 3600 + Time.m * 60 + Time.s === h * 3600 + m * 60 + s
      ? start()
      : restart(t, true);
    console.log(Time);
  };

  const handleTimePause = () => {
    setTime({ h: hours, m: minutes, s: seconds });
    pause();
  };

  useEffect(() => {
    currentPlayer === player && winner === 0
      ? handleTimeStart()
      : handleTimePause();
    if (seconds === 0 && minutes === 0 && hours === 0) {
      setWinner(player === 1 ? 2 : 1);
    }
  }, [currentPlayer, seconds, minutes, hours]);

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
