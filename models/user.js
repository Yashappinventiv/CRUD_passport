const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    username : {type : "string" , required : true , unique : true} ,
    password : {type : "string" , required : true} ,
    email : {type : "string" , required : true , unique : true} ,
    dob : {type : Date , required : true},
    image : {type : "string" , required : true }

})

module.exports = mongoose.model('user' , schema);