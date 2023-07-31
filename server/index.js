const express = require('express');
const app= express();
const cors=require('cors');
const mongoose= require('mongoose');

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/jwt",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("DB connection successsful");
}).catch(err =>{
    console.log(err.message);
})

app.listen(8000,()=>{
    console.log("Server started on port 8000");
})

