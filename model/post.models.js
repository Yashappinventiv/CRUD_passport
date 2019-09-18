const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title : {type : String } ,
    type : {type : Number , enum : [image = 1 , video = 2] , required : true} ,
    userId : {type : "ObjectId" , required : true} ,
    link  : {type : String} ,
    totalLikes : {type : Number , default : 0 , min : 0},
    totalComment : {type : Number , default : 0 , min : 0},
    comment : {type : "ObjectId" } ,
    report : {type : Number , default  : 0}
})


module.exports = mongoose.model("post" , schema)








