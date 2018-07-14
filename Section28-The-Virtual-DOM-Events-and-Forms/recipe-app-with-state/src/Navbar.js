import React from "react";
import "./Navbar.css";


function Navbar(props){
    return(
        <header>
            <nav>
               <h1><a href="#">Recipe App</a></h1>
               <ul>
                   <li onClick={props.newRecipe}><a href="#">New Recipe</a></li>
                   <li><a href="#">Home</a></li>
                   <li><a href="#">About</a></li>
                   <li><a href="#">Contact Us</a></li>
               </ul>
            </nav>
        </header>
    );

}

export default Navbar;