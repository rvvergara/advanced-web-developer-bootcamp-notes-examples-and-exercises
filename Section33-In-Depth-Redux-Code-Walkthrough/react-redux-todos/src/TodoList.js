import React, {Component} from "react";
import Todo from "./Todo";
import Form from "./Form";
import { connect } from "react-redux";
import { addTodo, removeTodo, editTodo } from "./actionCreators";

const mapStateToProps = state => (
    {
        todos: state.todos,
   }
);

const mapDispatchToProps = dispatch => (
    {
        addTodo: task => dispatch(addTodo(task)),
        removeTodo: id => dispatch(removeTodo(id)),
        editTodo: (id,task) => dispatch(editTodo(id,task)),
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
        this.props.addTodo(this.state.task);
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
        this.props.removeTodo(e.target.id);
    }
    handleEdit(e){
        e.stopPropagation();
        if(e.target.querySelector("button")){
            let regex = /X/g;
            let button = e.target.querySelector("button");
            let todoToEdit = e.target.innerText.replace(regex,"");
            let toEditId = button.id; 
            let newTodo = prompt("Updated todo: ",todoToEdit);
            this.props.editTodo(toEditId,newTodo);            
        }
    }
    render(){
        let todos = this.props.todos.map(todo=>(
                    <Todo 
                    key={todo.id} 
                    task={todo.task} 
                    id = {todo.id}
                    onRemove = {this.handleRemove.bind(this)}
                    onEdit = {this.handleEdit.bind(this)}
                    />
                ));
        return(
            <div>
                <Form 
                    task = {this.state.task}
                    handleChange = {this.handleChange}
                    handleSubmit = {this.handleSubmit}
                />
                <ul>
                    {todos}
                </ul>
            </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoList);