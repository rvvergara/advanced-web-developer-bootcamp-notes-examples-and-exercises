import React from "react";
import {Link} from "react-router-dom";

const Homepage = props => {
    return(
        <div className="home-hero">
            <h1>What's Happening?</h1>
            <h4>New to Warbler?</h4>
            <Link to="/signup" className="btn btn-primary">
                Sign up here
            </Link>
        </div>
    )
}

export default Homepage;
