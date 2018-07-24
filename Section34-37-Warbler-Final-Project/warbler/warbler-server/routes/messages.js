const   express     =   require("express"),
        {createMessage, getMessage, deleteMessage}  =   require("../handlers/messages"),
        router      =   express.Router({mergeParams:true});

// prefix - /api/users/:id/messages
router.route("/").post(createMessage);

// prefix - /api/users/:id/messages/:message_id
router.route("/:message_id").get(getMessage);

// prefix - /api/users/:id/messages/:message_id
router.route("/:message_id").delete(deleteMessage);

module.exports  =   router; 