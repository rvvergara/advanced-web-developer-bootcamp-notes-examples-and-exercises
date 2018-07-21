import React from "react";

const Form = ({task,handleChange,handleSubmit}) => (
    <form action="" onSubmit={handleSubmit}>
        <label htmlFor="task">Task: </label>
        <input 
        type="text" 
        name="task" 
        id="task" 
        autoComplete="off"
        onChange = {handleChange}
        value = {task}
        />
        <button>Add New Todo!</button>
    </form>
);

export default Form;