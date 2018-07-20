import React, {Component} from "react";
import Todo from "./Todo";
import { connect } from "react-redux";
import { addTodo, removeTodo } from "./actionCreators";

const mapStateToProps = state => (
    {
        todos: state.todos,
   }
);

const mapDispatchToProps = dispatch => (
    {
        addTodo: task => dispatch(addTodo(task)),
        removeTodo: id => dispatch(removeTodo(id))
    }
)

class TodoList extends Component {
    constructor(props){
        super(props);
        this.state = {
            task: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.dispatch(addTodo(this.state.task));
        this.setState({task:""});
    }
    handleChange(e){
        
        this.setState(
            {
                [e.target.name]:e.target.value
            }
        );
    }
    handleRemove(e){
        this.props.dispatch(removeTodo(e.target.id));
    }
    render(){
        let todos = this.props.todos.map(todo=>(
                    <Todo 
                    key={todo.id} 
                    task={todo.task} 
                    id = {todo.id}
                    onRemove = {this.handleRemove.bind(this)}
                    />
                ));
        return(
            <div>
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
                <ul>
                    {todos}
                </ul>
            </div>
        );
    }
}

export default connect(mapStateToProps)(TodoList);