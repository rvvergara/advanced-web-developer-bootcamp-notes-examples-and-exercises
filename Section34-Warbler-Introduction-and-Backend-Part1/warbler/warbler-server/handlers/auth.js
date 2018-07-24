const   db      =   require("../models"),
        jwt     =   require("jsonwebtoken");

exports.signin = async function(req,res,next){
    // finding a user 
    try {
        let user = await db.User.findOne({
            email: req.body.email,
        }),
            {id, username, profileImageUrl} = user,
            isMatch = await user.comparePassword(req.body.password);
        if(isMatch){
            let token = jwt.sign({
                id,
                username,
                profileImageUrl
            },
            process.env.SECRET_KEY);
            return res.status(200).json({
                id,
                username,
                profileImageUrl,
                token
            });
        } else {
            return next({
                status: 400,
                message: "Invalid Email/Password"
            });
        }
    }catch(err){
        return next({
            status: 400,
            message: "Invalid Email/Password"
        });
    }
    
    // checking if their password matches the one in the server
    // if it matches log them in
}

exports.signup = async function(req, res, next){
    try{
        let user = await db.User.create(req.body),
            {id,username,profileImageUrl} = user,
            token = jwt.sign({
                id,
                username,
                profileImageUrl
            },process.env.SECRET_KEY);
            return res.status(200).json({
                id,
                username,
                profileImageUrl,
                token
            })
        // create a user
        // create a token (signing a token)
        // process.env.SECRET_KEY
    }
    catch(err){
        // if a validation fails
        if(err.code === 11000){
            err.message = "Sorry, that username and/or email is taken"
        }
        return next({
            status: 400,
            message: err.message
        });
        // see what kind of error
        // if it is a certain error respond with username/email already taken
        // otherwise just send back generic 400

    }
}