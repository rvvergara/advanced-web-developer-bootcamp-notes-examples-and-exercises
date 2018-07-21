const   express       =   require("express"),
        bodyParser    =   require("body-parser"),
        cors          =   require("cors"),
        morgan        =   require("morgan"),
        todoRoutes    =   require("./routes/todos")
        app           =   express();

app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use("/api/todos",todoRoutes);

app.use((req,res,next)=>{
    let err = new Error("Not found");
    err.status = 404;
    next(err);
});

app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: err
    });
})

app.listen(4000,()=>console.log("Server has started"));

