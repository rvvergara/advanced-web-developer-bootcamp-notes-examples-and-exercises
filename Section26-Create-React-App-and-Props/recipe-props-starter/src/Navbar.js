import React, {Component} from "react";
import "./Navbar.css";

class Navbar extends Component {
    static defaultProps = {
        brand: "Recipe App",
        navLinks: [
            "New Recipe",
            "Home",
            "About",
            "Contact Us"
        ]
    }
    render(){
        return(
            <header>
                <nav>
                   <h1><a href="#">{this.props.brand}</a></h1>
                   <ul>
                       {this.props.navLinks.map((link,index)=>{
                           return <li key={index}><a href="#">{link}</a></li>
                       })}
                   </ul>
                </nav>
            </header>
        );
    }
}

export default Navbar;