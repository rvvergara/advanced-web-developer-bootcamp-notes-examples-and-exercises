import React, {Component} from 'react';
import Recipe from "./Recipe";
import PropTypes from "prop-types";

class RecipeList extends Component {
    static propTypes = {
        recipes: PropTypes.arrayOf(PropTypes.object).isRequired
      }    
    static defaultProps = {
        recipes: [
          {
            title: "Spaghetti",
            img: "spaghetti.jpg",
            ingredients: ["pasta","8 cups water","1 box spaghetti"],
            instructions: "Open jar of Spaghetti sauce. Bring to simmer. Boil water. Cook pasta until done. Combine pasta and sauce."
          },
          {
            title: "Milk Shake",
            img: "milkshake.jpg",
            ingredients: ["milk","strawberry","cherry"],
            instructions: "Pour milk on glass. Put ice. Shake and put cherry. Then put in fridge for good measure."
          },
          {
            title: "Crispy Pata",
            img: "crispy-pata.jpg",
            ingredients: ["pork","garlic","chilli"],
            instructions: "Deep fry pork, pour garlic over and shower with chilli and onions"
          }
        ]
      }
      render(){
          return (
            <ul>
                {this.props.recipes.map((r,i)=>{
                    return <Recipe 
                    key = {i}
                    title = {r.title}
                    ingredients = {r.ingredients}
                    img = {r.img}
                    instructions = {r.instructions}
                    />
                })}
            </ul>
          );
      }
}

export default RecipeList;