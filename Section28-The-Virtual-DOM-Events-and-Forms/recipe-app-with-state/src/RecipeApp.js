import React, { Component } from 'react';
import RecipeList from "./RecipeList";
import RecipeForm from "./RecipeForm";
import Navbar from "./Navbar";
import "./Recipe.css";
import PropTypes from "prop-types";

class RecipeApp extends Component {
  static propTypes = {
    recipes: PropTypes.arrayOf(PropTypes.object).isRequired
  }    
  constructor(props){
    super(props);
    this.state = {
      recipes: [
        {
          id:0,
          title: "Spaghetti",
          img: "spaghetti.jpg",
          ingredients: ["pasta","8 cups water","1 box spaghetti"],
          instructions: "Open jar of Spaghetti sauce. Bring to simmer. Boil water. Cook pasta until done. Combine pasta and sauce."
        },
        {
          id:1,
          title: "Milk Shake",
          img: "milkshake.jpg",
          ingredients: ["milk","strawberry","cherry"],
          instructions: "Pour milk on glass. Put ice. Shake and put cherry. Then put in fridge for good measure."
        },
        {
          id:2,
          title: "Crispy Pata",
          img: "crispy-pata.jpg",
          ingredients: ["pork","garlic","chilli"],
          instructions: "Deep fry pork, pour garlic over and shower with chilli and onions"
        }
      ],
      nextId: 3,
      showForm: false,
      newTitle: "",
      newInstructions: "",
      newIngredients: [""],
      newImage: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addNewIngredient = this.addNewIngredient.bind(this)
    this.addIngredient = this.addIngredient.bind(this);
    this.handleCloseForm = this.handleCloseForm.bind(this);
    this.handleNewRecipe = this.handleNewRecipe.bind(this);
    this.handleDeleteRecipe = this.handleDeleteRecipe.bind(this);
  }
  handleSubmit(e){
    e.preventDefault();
    const newRecipe = {
      title: this.state.newTitle,
      img: this.state.newImage,
      instructions: this.state.newInstructions,
      ingredients: this.state.newIngredients,
      id: this.state.nextId
    }
    this.setState((prevState,props)=>{ return {
      recipes: [...this.state.recipes,newRecipe],
      nextId: prevState.nextId+1,
      newTitle: "",
      newInstructions: "",
      newIngredients: [""],
      newImage: "",
      showForm: false,
    }})
  }
  handleChange(e){
    this.setState({[e.target.name]:e.target.value})
  }
  addNewIngredient(e){
    const newIngredients = this.state.newIngredients;
    this.setState({newIngredients:[...newIngredients,""]})
  }
  addIngredient(e){
    const ind = Number(e.target.name.split("-")[1]);
    const newIngredients = this.state.newIngredients.map((ing,i)=>(
      i===ind?e.target.value:ing
    ))
    this.setState({newIngredients})
  }
  handleCloseForm(e){
    this.setState({
      ...this.state,newTitle: "",
      newInstructions: "",
      newIngredients: [""],
      newImage: "",showForm:false
    })
  }
  handleNewRecipe(e){
    if(!this.setState.showForm) this.setState({...this.state,showForm:true})
  }
  handleDeleteRecipe(e){
    const recipes = [...this.state.recipes].filter(r=>r.id !== +e.target.id);
    this.setState({recipes});
  }

  render() {
    return (
       <div className="App">
          <Navbar newRecipe = {this.handleNewRecipe}/>

          {this.state.showForm?<RecipeForm 
          onSubmit={this.handleSubmit} 
          inputChange={this.handleChange}
          addInput = {this.addNewIngredient}
          addIngredient = {this.addIngredient}
          newIngredients={this.state.newIngredients}
          newTitle = {this.state.newTitle}
          newInstructions = {this.state.newInstructions}
          newImage = {this.state.newImage}
          closeForm = {this.handleCloseForm}
          />:null}
          
          <RecipeList 
          recipes={this.state.recipes} 
          deleteRecipe = {this.handleDeleteRecipe}
          />
       </div>
    );
  }
}

export default RecipeApp;
