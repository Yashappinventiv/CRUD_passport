const mongoose = require('mongoose')

const schema  = new mongoose.Schema({
    email : {type : String , required : true  , unique : true },
    password : {type : String , required : true},
  
    name : {type : String , required : true},
    gender : {type : String , enum : ["M" , "F"] },
    image : {type : String},

    postCount : {type : Number}
})

module.exports = mongoose.model('user' , schema)  

