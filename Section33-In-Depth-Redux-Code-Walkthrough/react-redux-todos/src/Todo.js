import React from "react";

const Todo = ({task,id,onRemove}) => (
    <li>
        {task}
        <button id={id} onClick={onRemove}>X</button>
    </li>
);

export default Todo;