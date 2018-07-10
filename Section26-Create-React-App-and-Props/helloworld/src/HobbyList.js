import React, {Component} from 'react';

class HobbyList extends Component {
    render(){
      const liStyle = {
        fontSize: "1.5em",
      };
      const hobbyList = ["Sleeping","Eating","Cuddling"];
      return(
        <ul>
          {hobbyList.map((h,i) => <li key={i} style={liStyle}>{h}</li>)}
        </ul>
      );
    }
  }

  export default HobbyList;