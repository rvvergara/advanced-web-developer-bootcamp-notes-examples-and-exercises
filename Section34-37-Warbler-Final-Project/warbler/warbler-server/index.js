require("dotenv").config();
const       express         =   require("express"),
            cors            =   require("cors"),
            bodyParser      =   require("body-parser"),
            errorHandler    =   require("./handlers/error"),
            authRoutes      =   require("./routes/auth"),
            messagesroutes  =   require("./routes/messages"),
            {loginRequired, ensureCorrectUser}  = require("./middleware/auth"),
            db              =   require("./models"),
            PORT            =   8081,
            app             =   express();

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use("/api/auth",authRoutes);
app.use("/api/users/:id/messages",
loginRequired, 
ensureCorrectUser, 
messagesroutes);

app.get("/api/messages",loginRequired,async function(req,res,next){
    try{
        let messages = await db.Message.find().sort({createdAt: "desc"}).populate("user",{
            username: true,
            profileImageUrl: true
        });
        return res.status(200).json(messages);
    }catch(err){
        return next(err);
    }
});

app.use((req,res,next)=>{
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use(errorHandler);

app.listen(PORT,()=>console.log(`Server is starting on port ${PORT}`));
