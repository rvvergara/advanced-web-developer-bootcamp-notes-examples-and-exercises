import React from "react";
import "./Header.css";

function Header(props){
    return(
        <header>
            <h1>Memory Game</h1>
            <h2><button type="button" onClick={props.newGame}>New Game</button></h2>
        </header>
    );
}

export default Header;