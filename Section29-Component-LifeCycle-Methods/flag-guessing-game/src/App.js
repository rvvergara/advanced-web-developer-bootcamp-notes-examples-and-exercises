import React, { Component } from 'react';
import './App.css';
import shuffle from "shuffle-array";
import Navbar from "./Navbar";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      countries: [],
      flag:"",
      name: "",
      options: [],
      result : "",
      disabled: false,
      newGame: false,
    };
    this.handleCheck = this.handleCheck.bind(this);
    this.handleNewGame = this.handleNewGame.bind(this);
  }
  componentDidMount(){
    const countriesUrl = "https://restcountries.eu/rest/v2/all";
    fetch(countriesUrl)
        .then(d=>d.json())
        .then(countries => {
          let country = this.generateRandomCountries(countries);
          let flag = country.flag;
          let name = country.name;
          let options = country.options;
          this.setState({countries,flag,name,options});
        });
  }
  generateRandomCountries(countries){
    const len = countries.length;
    
    let randomCountries = Array.from(new Set([Math.floor(Math.random()*len),Math.floor(Math.random()*len),Math.floor(Math.random()*len),Math.floor(Math.random()*len)]));
    
    while(randomCountries.length<4){
      randomCountries = Array.from(new Set([Math.floor(Math.random()*len),Math.floor(Math.random()*len),Math.floor(Math.random()*len),Math.floor(Math.random()*len)]));
    };

    let choices = [countries[randomCountries[0]],countries[randomCountries[1]],countries[randomCountries[2]],countries[randomCountries[3]]];
    let options = choices.map(c => c.name);
    let rightIndex = Math.floor(Math.random()*choices.length);
    let rightCountry = choices[rightIndex];
    let name = rightCountry.name;
    let flag = rightCountry.flag;

    return {flag,name,options};
  }
  handleCheck(e){
    let result;
    let disabled = true;
    let newGame = true;
    e.target.value === this.state.name?result ="Correct!":result="Wrong. The right answer is "+this.state.name;
    this.setState({...this.state,result,disabled,newGame});
    console.log(e.target.checked)
  }

  handleNewGame(e){
    let newGame = false;
    let result = "";
    let disabled = false;
    let countries = shuffle([...this.state.countries]);
    let country = this.generateRandomCountries(countries);
    let flag = country.flag;
    let name = country.name;
    let options = country.options;
    let inputs = Array.from(document.querySelectorAll("input"));
    inputs.forEach(i=>{
      if(i.checked) i.checked = false;
    })

    this.setState({flag,name,options,newGame,result,disabled,countries});
  }

  render() {
    let views = <div>Loading...</div>;
    let next = <button onClick={this.handleNewGame}>New Game</button>;
    const flag = this.state.flag;
    
    const selections = <div className="options">
    <ul>
      {this.state.options.map((c,i)=>(
        <li key={i}><label><input 
        type="radio" 
        name="country" 
        value={c} 
        onClick={this.handleCheck} 
        disabled={this.state.disabled}
        />{c}</label></li>
      ))}
    </ul>
  </div>;

    if(this.state.countries && flag) views = (<div className="container">
        <div>
          <img src={flag} alt="flag" />
          {selections}
          <div className="result">{this.state.result}</div>
          {this.state.newGame?next:null}
        </div>
      </div>)

    return (
      <div className="App">
        <Navbar />
        {views}
      </div>
    );
  }
}

export default App;
