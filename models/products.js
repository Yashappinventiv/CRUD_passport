const mongoose  = require('mongoose');

const schema = new mongoose.Schema({
    sellerId : {type : "ObjectId" , required  : true },
    type : {type : String , required : true},
    category : {type : String , required : true , max : 1},
    size : {type : String , required  : true , min : 1 , max : 3 } ,
    price  : {type : Number , required : true} ,
    brand : {type : String , required : true}
})

module.exports = mongoose.model('product' , schema)