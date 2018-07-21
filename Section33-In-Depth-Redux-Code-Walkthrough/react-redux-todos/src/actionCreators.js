export const GET_TODOS = "GET_TODOS";
export const ADD_TODO = "ADD_TODO";
export const REMOVE_TODO = "REMOVE_TODO";
export const EDIT_TODO = "EDIT_TODO";

const handleTodos = data => (
    {
        type: GET_TODOS,
        data
    }
)

const handleAdd = task => (
    {
        type: ADD_TODO,
        task
    }
);

const handleRemove = id => (
    {
        type: REMOVE_TODO,
        id
    }
);

const handleEdit = (id,task) => (
    {
        type: EDIT_TODO,
        id,
        task
    }
);

export const getTodos = () => {
    return dispatch => {
        return fetch("http://localhost:4000/api/todos")
               .then(res => res.json())
               .then(data => dispatch(handleTodos(data)))
               .catch(err => console.log("Something went wrong!",err));
    };
};

export const addTodo = task => {
    return dispatch => {
        return fetch("http://localhost:4000/api/todos",{
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
            }),
            body: JSON.stringify({
                task: task
            })
        })
        .then(res => res.json())
        .then(newTodo => dispatch(handleAdd(newTodo)))
        .catch(err => console.log("Something went wrong!", err));
    };
};

export const removeTodo = id => {
    return dispatch => {
        return fetch(`http://localhost:4000/api/todos/${id}`,{
            method: "DELETE"
        })
        .then(res => res.json())
        .then(data => dispatch(handleRemove(id)))
        .catch(err => console.log("Something went wrong!",err))
    }
};

export const editTodo = (id,newTodo) => {
    return dispatch => {
        return fetch(`http://localhost:4000/api/todos/${id}`,{
            method: "PUT",
            headers: new Headers({"Content-Type":"application/json"}),
            body: JSON.stringify({task:newTodo})
        })
        .then(res => res.json())
        .then(updatedTodo => dispatch(handleEdit(id,newTodo)))
        .catch(err => console.log("Something went wrong!",err));
    }
};