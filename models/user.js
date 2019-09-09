const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username : {type : "string" , required : true , unique : true} ,
    password : {type : "string" , required : true} ,
    email : {type : "string" , required : true , unique : true} ,
    image : {type : "string" },
    gender : {type : "string" , required : true , max : 1},
    phoneno : {type : "string" , required : true , max : 10 , min : 10},
    address : {
        street : {type : "string" , required : true} ,
        pincode : {type : "number" , required : true , max : 6 , min : 6} ,
        landmark : {type : "string"},
        city : {type : "string" , required : true},
        state : {type : "string" , required : true}
    } ,
   buys : [{
       type : mongoose.Schema.ObjectId ,
       ref : "product"
   }] 
})

module.exports =  mongoose.model("user" , schema)