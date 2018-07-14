import React, { Component } from 'react';
import Header from "./Header";
// import Rectangle from "./Rectangle";
import './MemoryApp.css';
import "./Rectangle.css";

const colors = ["red","orange","yellow","green","blue","violet","indigo","maroon","red","orange","yellow","green","blue","violet","indigo","maroon"];

function shuffleArr(arr){
    for(let i=arr.length-1;i>0;i--){
        let j = Math.floor(Math.random()*(i+1));
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}

const CardState = {
  HIDING: 0,
  SHOWING: 1,
  MATCHING: 2,
}

let cards = colors.map((color,i)=>({
  id: i,
  cardState: CardState.HIDING,
  backgroundColor: color
}));

class MemoryApp extends Component {
  constructor(props){
    super(props);
    this.state = {cards:shuffleArr(cards),noClick:false};
    this.handleNewGame = this.handleNewGame.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  createBoxes(){
    return cards.map((c,i)=>(
      <div 
      className="box"
      key={i}
      id={c.id}
      cardstate={c.cardState}
      style = {
        c.cardState===0?{backgroundColor: "#ccc"}:{backgroundColor:c.backgroundColor}
      }
      onClick = {
        c.noClick?null:this.handleClick
      }
      />
    ));
  }
  handleNewGame(e){
    // this.setState({cards:shuffleArr(cards),noClick:false})
  }

  handleClick(e){
    e.preventDefault();
    const cards = this.state.cards.map(c=>{
      if(+e.target.id === c.id) c.cardState = 1;
      return c;
    });

    const matchedCards = [];

    const shownCards = cards.filter((c,i)=>{
      return c.cardState === 1 && !matchedCards.includes(c);
    });
  
  
    console.log("shownCards",shownCards)
    this.setState((prevState,props)=>{
      shownCards.reduce((acc,next)=>{
        if(acc.backgroundColor === next.backgroundColor){
          acc.cardState = 2;
          next.cardState = 2;
          acc.noClick = true;
          next.noClick = true;
        }
        else{
          acc.cardState = 0;
          next.cardState = 0;
        }
        return next;
      })  
      return {cards}
    });
  }
  render() {
    return (
      <div className="App">
        <Header newGame = {this.handleNewGame} />
        {this.createBoxes()}     
      </div>
    );
  }
}

export default MemoryApp;
