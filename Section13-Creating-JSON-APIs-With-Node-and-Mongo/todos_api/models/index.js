const   mongoose    =   require("mongoose"),
        url         =   process.env.DATABASEURL || "mongodb://localhost/todos-api";
        
mongoose.set("debug",true);
mongoose.connect(url);
mongoose.Promise = Promise;

module.exports.Todo =  require("./todo");