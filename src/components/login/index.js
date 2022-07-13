import React from "react";
import { Container, Cover, Input, Panel, Submit } from "./styles";

export default function Login({children, ...restProps}) {
    return <Container {...restProps}>{children}</Container>
}

Login.Panel = function LoginPanel({player = 1, children, ...restProps}) {
    return (
        <Cover className={player === 1 ? "player2" : "player1"} {...restProps}>
            <Panel className={player === 1 ? "player1" : "player2"}>
                {children}
                {player === 1 ? "player 1" : "player 2"}
                <Input player={player} type="submit"/>
                <Submit player={player}>
                    Submit
                </Submit>
            </Panel>
        </Cover>
    )
}