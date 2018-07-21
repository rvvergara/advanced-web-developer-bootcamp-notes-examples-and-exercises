import React, {Component} from "react";
import Todo from "./Todo";
import Form from "./Form";
import { connect } from "react-redux";
import { addTodo, removeTodo, editTodo,getTodos } from "./actionCreators";
import { Route } from "react-router-dom";

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
        getTodos: () => dispatch(getTodos()),
    }
)

class TodoList extends Component {
    constructor(props){
        super(props);
        this.handleAdd = this.handleAdd.bind(this);
    }
    componentDidMount(){
        this.props.getTodos();
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
    handleAdd(val){
        this.props.addTodo(val);
    }
    render(){
        let todos = this.props.todos.map(todo=>(
                    <Todo 
                    key={todo._id} 
                    task={todo.task} 
                    id = {todo._id}
                    onRemove = {this.handleRemove.bind(this)}
                    onEdit = {this.handleEdit.bind(this)}
                    />
                ));
        return(
                <div>
                    <Route exact path="/todos" component = {()=><div><ul>{todos}</ul></div>} />
                    <Route path="/todos/new" component = {props=>(
                        <Form {...props} handleAdd={this.handleAdd} />
                    )} />
                </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoList);