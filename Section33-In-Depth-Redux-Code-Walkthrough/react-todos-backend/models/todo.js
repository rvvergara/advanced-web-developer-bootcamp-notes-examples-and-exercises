const   mongoose    =   require("mongoose");

mongoose.connect("mongodb://localhost/todos-backend");
mongoose.set("debug",true);
mongoose.Promise =  Promise;

let todoSchema    =   new mongoose.Schema({
    task: String,   
});

module.exports = mongoose.model("Todo",todoSchema);
