const mongoose= require("mongoose");

const userSchema= mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },

    username: {
        type: String,
        required:[true,"Please provide the user name."]
    },
    email:{
        type: String,
        required: [true, "Please provide email id."],
        unique: [true, "Email address already used."]
    },
    password:{
        type: String,
        required: [true, "Please add the user password."]
    },
},{
    timestamps: true,
});

module.exports=mongoose.model("user",userSchema);