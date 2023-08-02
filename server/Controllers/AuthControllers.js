const UserModel =require('../Models/UserModel.js');
const jwt= require('jsonwebtoken')

const maxAge=3*24*60*60; //3days

const createToken=(id)=>{
    return jwt.sign({id},"nishant",{
        expiresIn:maxAge,
    });

}

//11000 is duplicate key error in mongo

const handleErrors=(err)=>{
    let errors= {email:"",password:""};

    if(err.code === 11000)
    {
        errors.email="Email is already registered";
        return errors;
    }
    //when email is empty
    if(err.message.includes("User validation failed")){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path]=properties.message;
        });
      
        return errors;
    }
    
};



module.exports.register = async(req, res, next)=>{
    try{
        const {email,password}=req.body;
        const user=await UserModel.create({email,password});
        const token=createToken(user._id);

        res.cookie("jwt",token,{
            withCredentials:true,
            httpOnly:false,
            maxAge:maxAge*1000,
        });
        res.status(201).json({user:user._id,created:true});

    }catch(err)
    {
        console.log(err);
        const errors=handleErrors(err);
        res.json({errors,created:false});

    }
};

module.exports.login = async(req, res, next)=>{
   
};