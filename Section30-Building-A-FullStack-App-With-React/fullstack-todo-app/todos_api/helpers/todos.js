const   db  =   require("../models");

// 1. INDEX ROUTE - "/api/todos" - GET - show all todos - Todo.find()
exports.getTodos = function(req,res){
    db.Todo.find()
    .then(function(todos){
        res.json(todos);
    })
    .catch(function(err){
        res.send(err);
    });
}

// 2. CREATE - "/api/todos" - POST - create new todo - Todo.create()
exports.createTodo = function(req,res){
    db.Todo.create(req.body)
    .then(function(newTodo){
        res.status(201).json(newTodo);
    })
    .catch(function(err){
        res.send(err);
    });
}

// 3. SHOW - "/api/todos/todoId=:todoId" - GET - show info on specific todo - Todo.findById()
exports.showTodo = function(req,res){
    db.Todo.findById(req.params.todoId)
    .then(function(foundTodo){
        res.json(foundTodo);
    })
    .catch(function(err){
        res.send(err);
    });
}

// 4. UPDATE - "/api/todos/todoId=:todoId" - PUT - update todo - Todo.findOneAndUpdate({_id:req.params.todoId},req.body,{new:true})
exports.updateTodo = function(req,res){
    db.Todo.findOneAndUpdate({_id: req.params.todoId},req.body,{new:true})
    .then(function(updatedTodo){
        res.json(updatedTodo);
    })
    .catch(function(err){
        res.send(err);
    });
}

// 5. DELETE - "/api/todos/todoId=:todoId" - DELETE - delete a todo - Todo.
exports.deleteTodo = function(req,res){
    db.Todo.remove({_id:req.params.todoId})
    .then(function(){
        res.json({message: "todo deleted"});
    })
    .catch(function(err){
        res.send(err);
    });
}

module.exports = exports;