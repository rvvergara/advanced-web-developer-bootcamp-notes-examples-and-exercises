const   express     =   require("express"),
        { signup, signin }  =   require("../handlers/auth"),
        router      =   express.Router();

router.post("/signup",signup);

router.post("/signin",signin);

module.exports  =    router;