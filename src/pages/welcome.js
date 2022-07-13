import React from "react";
import Login from "../components/login";

export default function Welcome() {
    return (    
    <Login>
        <Login.Panel player={1}>
        </Login.Panel>
        <Login.Panel player={2}>
        </Login.Panel>
    </Login>)
}