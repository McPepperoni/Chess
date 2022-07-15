import React, { useRef } from "react";
import { Container, Cover, Input, Panel, Submit } from "./styles";

export default function Login({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

Login.Panel = function LoginPanel({
  currentPlayer,
  setPlayer,
  player = 1,
  children,
  ...restProps
}) {
  const InputRef = useRef(null);

  return (
    <Cover className={player === 1 ? "player2" : "player1"} {...restProps}>
      <Panel
        className={player === 1 ? "player1" : "player2"}
        player={player}
        ready={currentPlayer.ready}
      >
        {children}
        {player === 1 ? "player 1" : "player 2"}
        <Input player={player} type="text" ref={InputRef} />
        <Submit
          player={player}
          onClick={(e) => {
            e.preventDefault();
            if (InputRef.current.value !== "")
              setPlayer({ ign: InputRef.current.value, ready: true });
          }}
        >
          Go
        </Submit>
      </Panel>
    </Cover>
  );
};
