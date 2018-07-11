import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instructors: [
        {
          name: 'Tim',
          hobbies: ['sailing', 'react']
        }, {
          name: 'Matt',
          hobbies: ['math', 'd3']
        }, {
          name: 'Colt',
          hobbies: ['css', 'hiking']
        }, {
          name: 'Elie',
          hobbies: ['music', 'es2015']
        }
      ]
    };
    setTimeout(()=>{
      const randomInst = Math.floor(Math.random()*this.state.instructors.length),

      randomHobby = Math.floor(Math.random()*this.state.instructors[randomInst].hobbies.length),

      instructors = this.state.instructors.map((inst,i)=>{
        if(i=== randomInst){
          return {
            ...inst,
            hobbies: [...inst.hobbies].splice(randomHobby,1)
          }
        }
        return inst;
      });
      this.setState({instructors});
    },3000)
    
  }
  render() {
    const instructors = this.state.instructors.map((instructor, index) => (
      <li key={index}>
        <h3>{instructor.name}</h3>
        <h4>Hobbies: {instructor.hobbies.join(", ")}</h4>
      </li>
    ));
    return (
      <div className="App">
        <ul>
          {instructors}
        </ul>
      </div>
    );
  }
}

export default App;