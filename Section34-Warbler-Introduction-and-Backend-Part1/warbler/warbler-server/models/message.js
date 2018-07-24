const mongoose  =   require("mongoose"),
      User      =   require("./user");

const messageSchema =  new mongoose.Schema({
    text: {
        type: "String",
        required: true,
        maxlength: 160
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{
    timestamps: true
});

messageSchema.pre("remove",async function(next){
    try{
    // find a user
    let user =  await User.findById(this.user);
    // remove id of the message from their messages list/array
    user.message.remove(this.id);
    // save that user and return next
    await user.save();
    return next();
    }catch(err){
        return next(err);
    }

})

module.exports  =   mongoose.model("Message",messageSchema);

