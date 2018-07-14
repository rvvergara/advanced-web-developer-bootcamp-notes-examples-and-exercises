import React from "react";
import "./Rectangle.css";

function Rectangle(props){
    return(
        <div 
        className="box" 
        style={{backgroundColor:props.backgroundColor}}
        onClick = {props.onClick}
        id = {props.id}
        hiddencolor={props.hiddenColor}
        />
    );
}

export default Rectangle;