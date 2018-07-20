export const ADD_TODO = "ADD_TODO";
export const REMOVE_TODO = "REMOVE_TODO";

export const addTodo = task => (
    {
        type: ADD_TODO,
        task
    }
);

export const removeTodo = id => (
    {
        type: REMOVE_TODO,
        id
    }
);