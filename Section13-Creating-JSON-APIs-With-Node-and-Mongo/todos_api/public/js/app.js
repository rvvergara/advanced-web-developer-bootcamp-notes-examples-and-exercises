$(document).ready(function(){
    $.getJSON("api/todos")
    .done(showTodos)
    .fail(function(err){
        console.log(err);
    });        

    $("#todoInput").on("keypress",function(e){
        if(e.which === 13) createTodo();
    })

    $(".list").on("click","span",function(e){
        e.stopPropagation();
        deleteTodo($(this).parent());
    });

    $(".list").on("click",".task",function(){
        updateTodo($(this));
    });
});

function showTodos(res){
    for(let todo of res){
        addTodo(todo); 
    }
}

function createTodo(){
    $.post("api/todos",{name:$("#todoInput").val()})
    .then(function(newTodo){
        addTodo(newTodo);
    })
    .then(function(){
        $("#todoInput").val("");
    })
    .catch(function(err){
        console.log(err);
    });
}

function addTodo(todo){
    let newTodo = $("<li class='task'>"+todo.name+"<span>x</span></li>");
    newTodo.data("id",todo._id);
    newTodo.data("completed",todo.completed);
        if(todo.completed){
            newTodo.addClass("done");
        }
        $(".list").append(newTodo);
}

function deleteTodo(el){
    let todoId = el.data("id"),
            deleteURL = "api/todos/todoId=" + todoId;
        $.ajax({
            method: "DELETE",
            url: deleteURL,
        })
        .then(function(data){
            el.remove();
        })
        .catch(function(err){
            console.log(err);
        });
}

function updateTodo(el){
    let todoId    = updateURL = "api/todos/todoId="+el.data("id"),
        isCompleted = !el.data("completed");
        reqData = {completed:isCompleted};
    $.ajax({
        method: "PUT",
        url: updateURL,
        data: reqData,
    })
    .then(function(data){
        el.data("completed",isCompleted);
        el.toggleClass("done");
    })
    .catch(function(err){
        console.log(err);
    })
}