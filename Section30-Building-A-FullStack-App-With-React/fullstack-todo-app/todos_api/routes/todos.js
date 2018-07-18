const   express     =   require("express"),
        db          =   require("../models"),  
        helpers     =   require("../helpers/todos"),
        router      =   express.Router();

    router.route("/")
.get(helpers.getTodos)
.post(helpers.createTodo);

router.route("/todoId=:todoId")
.get(helpers.showTodo)
.put(helpers.updateTodo)
.delete(helpers.deleteTodo);

module.exports = router;