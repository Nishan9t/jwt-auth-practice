const mongoose = require("mongoose");
const bcrypt=require('bcrypt')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email is Required"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"Password is Required"],
    },
});

//before saving the data batabase
userSchema.pre("save",async function(next){

    const salt=await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);

})


module.exports = mongoose.model("User",userSchema);