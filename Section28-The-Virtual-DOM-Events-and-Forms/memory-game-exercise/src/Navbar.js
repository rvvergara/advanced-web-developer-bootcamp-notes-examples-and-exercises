import React from "react";
import PropTypes from "prop-types";
import "./Navbar.css";

const Navbar = (props) => {
    return(
        <header>
            <h1><a>Memory Game</a></h1>
            <nav>
                <li><a onClick={props.onNewGame}>New Game</a></li>
            </nav>
        </header>
    );
}

Navbar.propTypes = {
    onNewGame: PropTypes.func.isRequired
}

export default Navbar;