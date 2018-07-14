import React, {Component} from 'react';
import Proptypes from "prop-types";

class Recipe extends Component {
    static propTypes = {
        title: Proptypes.string.isRequired,
        img: Proptypes.string.isRequired,
        ingredients: Proptypes.arrayOf(Proptypes.string).isRequired,
        instructions: Proptypes.string.isRequired,
    }
    render(){
        const {title,img,ingredients,instructions,deleteRecipe,buttonId} = this.props;
        const ings = ingredients.map((ing,index)=>{
            return <li key={index}>{ing}</li>
        });

        return(
            <div className="recipe-card">
                <div className="recipe-card-image">
                    <img src={img} alt={title} />
                </div>
                <div className="recipe-card-content">
                    <h3 className="recipe-title">{title}</h3>
                    <h4>Ingredients:</h4>
                    <ul>
                        {ings}
                    </ul>
                    <h4>Instructions:</h4>
                    <p>{instructions}</p>
                    <button type="button" onClick={deleteRecipe} id={buttonId}>Delete</button>
                </div>
            </div>
        )
    }
}

export default Recipe;