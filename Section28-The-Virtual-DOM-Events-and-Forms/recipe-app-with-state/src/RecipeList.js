import React, {Component} from 'react';
import Recipe from "./Recipe";

class RecipeList extends Component {
      render(){
          return (
            <ul>
                {this.props.recipes.map((r)=>{
                    return <Recipe 
                    key = {r.id}
                    title = {r.title}
                    ingredients = {r.ingredients}
                    img = {r.img}
                    instructions = {r.instructions}
                    deleteRecipe = {this.props.deleteRecipe}
                    buttonId = {r.id}
                    />
                })}
            </ul>
          );
      }
}

export default RecipeList;