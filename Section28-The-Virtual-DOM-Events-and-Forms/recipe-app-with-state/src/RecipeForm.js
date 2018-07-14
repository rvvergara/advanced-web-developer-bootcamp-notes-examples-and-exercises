import React from 'react';
import "./RecipeForm.css";

function RecipeForm(props){
    let ings = props.newIngredients.map((ing,i)=>(
        <div  className="recipe-form-line" key={`ingredient-${i}`}>
            <label>{i+1}.
            <input type="text"
            name={`ingredient -${i}`}
            value={ing}
            size={45}
            autoComplete="off"
            placeholder="Ingredient"
            onChange={props.addIngredient}
            />
            </label>
        </div>
    ))
    return(
      <div className="recipe-form-container">
          <form onSubmit={props.onSubmit} className="recipe-form">
            <button className="close-button" type="button" onClick={props.closeForm}>X</button>
            <div className="recipe-form-line">
                <label htmlFor="recipe-title-input">Title</label>
                <input type="text" 
                key="newTitle"
                name="newTitle"  
                id="recipe-title-input"
                value={props.newTitle}
                onChange={props.inputChange}
                size={42}
                autoComplete="off" />
            </div>
            <label htmlFor="recipe-instructions-input"
            style={{marginTop: "5px"}}>
            Instructions:
            </label>
             <textarea 
             name="newInstructions" 
             key="newInstructions"
             id="recipe-instructions-input"
             rows="8"
             cols="52"
             type="Instructions"
             value={props.newInstructions}
             onChange={props.inputChange}/>
            {ings}
            <button className="buttons" type="button" onClick={props.addInput}>+</button>
            <div className="recipe-form-line">
                <label htmlFor="recipe-img-input">Image URL</label>
                <input type="text" 
                key="newImage"
                name="newImage"  
                id="recipe-title-input"
                value={props.newImage}
                onChange={props.inputChange}
                size={36}
                autoComplete="off" />
            </div>
             <input className="buttons" type="submit" style={{alignSelf: 'flex-end', marginRight: 0}} value="SAVE" />
          </form>
      </div>
    )
  }


export default RecipeForm;