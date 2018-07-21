import React from "react";

const Todo = ({task,id,onRemove,onEdit}) => (
    <li onClick={onEdit}>
        {task}
        <button id={id} onClick={onRemove}>X</button>
    </li>
);

export default Todo;