const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    email : {type : String , required : true , unique : true} ,
    password : {type : String , required : true , unique : true},
    issusedAt : {type : Date ,  default : Date.now}
})

module.exports = mongoose.model("admin" , schema);