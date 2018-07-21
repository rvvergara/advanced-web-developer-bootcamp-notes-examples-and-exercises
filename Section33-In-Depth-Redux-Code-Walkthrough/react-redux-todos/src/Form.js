import React, {Component} from "react";

class Form extends Component {
    constructor(props){
        super(props);
        this.state = {
            task: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.handleAdd(this.state.task);
        this.setState({task:""});
        this.props.history.push("/todos");
    }
    handleChange(e){
        this.setState(
            {
                [e.target.name]:e.target.value
            });
    }
    render(){
        return(
            <form action="" onSubmit={this.handleSubmit}>
                <label htmlFor="task">Task: </label>
                <input 
                type="text" 
                name="task" 
                id="task" 
                autoComplete="off"
                onChange = {this.handleChange}
                value = {this.state.task}
                />
                <button>Add New Todo!</button>
            </form>
        );
    }
}

export default Form;